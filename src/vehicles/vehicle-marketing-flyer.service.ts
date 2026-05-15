import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DealrstackAiService } from '../ai/dealrstack-ai.service';
import { TenantEntity } from '../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import {
  CreateFlyerMarketingThreadDto,
  FlyerMarketingChatStreamDto,
  UpdateFlyerMarketingMessageDto,
  UpdateFlyerMarketingThreadDto,
  VehicleMarketingFlyerMessageResponseDto,
  VehicleMarketingFlyerThreadDetailDto,
  VehicleMarketingFlyerThreadSummaryDto,
} from './dto/vehicle-marketing-flyer.dto';
import { VehicleMarketingMessageEntity } from './infrastructure/persistence/relational/entities/vehicle-marketing-message.entity';
import { VehicleMarketingThreadEntity } from './infrastructure/persistence/relational/entities/vehicle-marketing-thread.entity';
import { VehicleEntity } from './infrastructure/persistence/relational/entities/vehicle.entity';
import {
  buildFlyerVehicleFactsBlock,
  VEHICLE_MARKETING_FLYER_SYSTEM_PROMPT,
} from './vehicle-marketing-flyer-prompts';
import {
  normalizeFlyerArtifactParsed,
  parseFlyerArtifactFromText,
} from './vehicle-marketing-flyer-artifact.util';

function messageToDto(
  entity: VehicleMarketingMessageEntity,
): VehicleMarketingFlyerMessageResponseDto {
  return {
    id: entity.id,
    role: entity.role,
    content: entity.content,
    artifact: entity.artifact ?? null,
    createdAt: entity.createdAt.toISOString(),
  };
}

function threadSummaryDto(
  entity: VehicleMarketingThreadEntity,
): VehicleMarketingFlyerThreadSummaryDto {
  return {
    id: entity.id,
    title: entity.title ?? null,
    parentThreadId: entity.parentThreadId ?? null,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}

@Injectable()
export class VehicleMarketingFlyerService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    @InjectRepository(VehicleMarketingThreadEntity)
    private readonly threadRepository: Repository<VehicleMarketingThreadEntity>,
    @InjectRepository(VehicleMarketingMessageEntity)
    private readonly messageRepository: Repository<VehicleMarketingMessageEntity>,
    private readonly dealrstackAiService: DealrstackAiService,
  ) {}

  async listThreads(
    tenantId: number,
    vehicleId: number,
  ): Promise<VehicleMarketingFlyerThreadSummaryDto[]> {
    await this.ensureVehicle(tenantId, vehicleId);
    const threads = await this.threadRepository.find({
      where: {
        vehicle: { id: vehicleId, tenant: { id: tenantId } },
      },
      order: { updatedAt: 'DESC' },
    });
    return threads.map(threadSummaryDto);
  }

  async createThread(
    tenantId: number,
    vehicleId: number,
    dto: CreateFlyerMarketingThreadDto,
  ): Promise<VehicleMarketingFlyerThreadSummaryDto> {
    const vehicle = await this.ensureVehicle(tenantId, vehicleId);

    let parentThread: VehicleMarketingThreadEntity | null = null;
    if (dto.parentThreadId != null) {
      parentThread = await this.threadRepository.findOne({
        where: {
          id: dto.parentThreadId,
          vehicle: { id: vehicleId, tenant: { id: tenantId } },
        },
      });
      if (!parentThread) {
        throw new NotFoundException('Parent thread not found');
      }
    }

    const thread = this.threadRepository.create({
      vehicle,
      parentThread: parentThread ?? undefined,
      title: dto.title?.trim() || null,
    });
    await this.threadRepository.save(thread);
    return threadSummaryDto(thread);
  }

  async getThreadDetail(
    tenantId: number,
    vehicleId: number,
    threadId: number,
  ): Promise<VehicleMarketingFlyerThreadDetailDto> {
    const thread = await this.loadThreadOrThrow(tenantId, vehicleId, threadId);
    const messages = await this.messageRepository.find({
      where: { thread: { id: thread.id } },
      order: { createdAt: 'ASC' },
    });
    return {
      ...threadSummaryDto(thread),
      messages: messages.map(messageToDto),
    };
  }

  async updateThread(
    tenantId: number,
    vehicleId: number,
    threadId: number,
    dto: UpdateFlyerMarketingThreadDto,
  ): Promise<VehicleMarketingFlyerThreadSummaryDto> {
    const thread = await this.loadThreadOrThrow(tenantId, vehicleId, threadId);
    if (dto.title !== undefined) {
      thread.title = dto.title.trim() || null;
      await this.threadRepository.save(thread);
    }
    return threadSummaryDto(thread);
  }

  async streamAssistantReply(
    tenantId: number,
    vehicleId: number,
    threadId: number,
    dto: FlyerMarketingChatStreamDto,
    writeEvent: (payload: Record<string, unknown>) => void,
  ): Promise<void> {
    const { thread, vehicle } = await this.loadThreadWithVehicle(
      tenantId,
      vehicleId,
      threadId,
    );

    const userEntity = this.messageRepository.create({
      thread,
      role: 'user',
      content: dto.message.trim(),
    });
    await this.messageRepository.save(userEntity);

    if (!thread.title?.trim()) {
      thread.title = dto.message.trim().slice(0, 120);
      await this.threadRepository.save(thread);
    }

    const rows = await this.messageRepository.find({
      where: { thread: { id: thread.id } },
      order: { createdAt: 'ASC' },
    });

    const ancestorBlob = await this.buildAncestorContext(
      tenantId,
      vehicleId,
      thread.parentThreadId ?? null,
    );

    const system = `${VEHICLE_MARKETING_FLYER_SYSTEM_PROMPT}\n\nListing facts:\n${buildFlyerVehicleFactsBlock(vehicle)}`;

    const conversation: { role: 'user' | 'assistant'; content: string }[] = [];

    if (ancestorBlob) {
      conversation.push({
        role: 'user',
        content: ancestorBlob,
      });
      conversation.push({
        role: 'assistant',
        content:
          'Understood — I will carry tone and positioning across threads unless you explicitly revise facts.',
      });
    }

    for (const r of rows) {
      conversation.push({
        role: r.role === 'assistant' ? 'assistant' : 'user',
        content: r.content,
      });
    }

    let streamedFull = '';
    const aiResult = await this.dealrstackAiService.streamMarketingConversation(
      system,
      conversation,
      (delta) => {
        streamedFull += delta;
        writeEvent({ type: 'delta', text: delta });
      },
    );

    const combined =
      aiResult?.fullText?.trim() ||
      streamedFull.trim() ||
      'No AI text provider is configured on the DealrStack API. Add a DeepSeek, OpenAI, or Gemini API key (or adjust the primary provider order) so flyer copy and JSON artifacts are generated by AI from your listing facts.';

    if (!aiResult?.fullText?.trim() && !streamedFull.trim()) {
      writeEvent({
        type: 'delta',
        text: combined,
      });
    }

    const artifact = parseFlyerArtifactFromText(combined);
    const assistantEntity = this.messageRepository.create({
      thread,
      role: 'assistant',
      content: combined,
      artifact: artifact ?? null,
    });
    await this.messageRepository.save(assistantEntity);

    thread.updatedAt = new Date();
    await this.threadRepository.save(thread);

    writeEvent({
      type: 'done',
      assistantMessageId: assistantEntity.id,
      provider: aiResult?.provider ?? 'template',
      artifact: artifact ?? null,
    });
  }

  async updateMessage(
    tenantId: number,
    vehicleId: number,
    threadId: number,
    messageId: number,
    dto: UpdateFlyerMarketingMessageDto,
  ): Promise<VehicleMarketingFlyerMessageResponseDto> {
    await this.loadThreadOrThrow(tenantId, vehicleId, threadId);

    const message = await this.messageRepository.findOne({
      where: {
        id: messageId,
        thread: {
          id: threadId,
          vehicle: { id: vehicleId, tenant: { id: tenantId } },
        },
      },
      relations: ['thread'],
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (dto.content === undefined && dto.artifact === undefined) {
      throw new BadRequestException('Nothing to update');
    }

    if (dto.content !== undefined) {
      message.content = dto.content;
    }

    if (dto.artifact !== undefined) {
      const normalized = normalizeFlyerArtifactParsed(
        dto.artifact as Record<string, unknown>,
      );
      if (!normalized) {
        throw new BadRequestException(
          'Flyer artifact requires non-empty headline and priceLine',
        );
      }
      message.artifact = normalized;
    }

    await this.messageRepository.save(message);

    message.thread.updatedAt = new Date();
    await this.threadRepository.save(message.thread);

    return messageToDto(message);
  }

  private async ensureVehicle(
    tenantId: number,
    vehicleId: number,
  ): Promise<VehicleEntity> {
    const tenant = await this.tenantRepository.findOne({
      where: { id: tenantId, isActive: true },
    });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    const vehicle = await this.vehicleRepository.findOne({
      where: {
        id: vehicleId,
        tenant: { id: tenantId },
      },
      relations: ['tenant', 'mediaAssets'],
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  private async loadThreadOrThrow(
    tenantId: number,
    vehicleId: number,
    threadId: number,
  ): Promise<VehicleMarketingThreadEntity> {
    const thread = await this.threadRepository.findOne({
      where: {
        id: threadId,
        vehicle: { id: vehicleId, tenant: { id: tenantId } },
      },
      relations: ['vehicle'],
    });

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    return thread;
  }

  private async loadThreadWithVehicle(
    tenantId: number,
    vehicleId: number,
    threadId: number,
  ): Promise<{
    thread: VehicleMarketingThreadEntity;
    vehicle: VehicleEntity;
  }> {
    const thread = await this.threadRepository.findOne({
      where: {
        id: threadId,
        vehicle: { id: vehicleId, tenant: { id: tenantId } },
      },
      relations: ['vehicle', 'vehicle.mediaAssets'],
    });

    if (!thread || !thread.vehicle) {
      throw new NotFoundException('Thread not found');
    }

    return { thread, vehicle: thread.vehicle };
  }

  private async buildAncestorContext(
    tenantId: number,
    vehicleId: number,
    immediateParentId: number | null,
  ): Promise<string | null> {
    const idsNewestFirst: number[] = [];
    let cursor: number | null = immediateParentId;

    while (cursor !== null) {
      idsNewestFirst.push(cursor);
      const row = await this.threadRepository.findOne({
        where: {
          id: cursor,
          vehicle: { id: vehicleId, tenant: { id: tenantId } },
        },
        select: ['id', 'parentThreadId'],
      });
      cursor = row?.parentThreadId ?? null;
    }

    const oldestFirst = [...idsNewestFirst].reverse();
    const blocks: string[] = [];

    for (const tid of oldestFirst) {
      const msgs = await this.messageRepository.find({
        where: { thread: { id: tid } },
        order: { createdAt: 'ASC' },
      });

      if (!msgs.length) {
        continue;
      }

      const lines = msgs.map((m) => {
        const label = m.role === 'user' ? 'Dealer' : 'Creative assistant';
        return `${label}: ${m.content}`;
      });

      blocks.push(`Earlier flyer thread #${tid}:\n${lines.join('\n\n')}`);
    }

    return blocks.length ? blocks.join('\n\n---\n\n') : null;
  }
}
