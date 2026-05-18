import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesLeadCaptureEventEntity } from './infrastructure/persistence/relational/entities/sales-lead-capture-event.entity';

export const LEAD_CAPTURE_EVENT_SOURCE = {
  metaLeadgen: 'meta_leadgen',
  website: 'website',
} as const;

export type LeadCaptureEventSource =
  (typeof LEAD_CAPTURE_EVENT_SOURCE)[keyof typeof LEAD_CAPTURE_EVENT_SOURCE];

@Injectable()
export class SalesLeadCaptureEventService {
  constructor(
    @InjectRepository(SalesLeadCaptureEventEntity)
    private readonly eventRepository: Repository<SalesLeadCaptureEventEntity>,
  ) {}

  async findProcessed(
    tenantId: number,
    source: LeadCaptureEventSource,
    externalId: string,
  ): Promise<SalesLeadCaptureEventEntity | null> {
    return this.eventRepository.findOne({
      where: { tenantId, source, externalId },
    });
  }

  async recordProcessed(input: {
    tenantId: number;
    source: LeadCaptureEventSource;
    externalId: string;
    leadId?: number | null;
  }): Promise<SalesLeadCaptureEventEntity> {
    const existing = await this.findProcessed(
      input.tenantId,
      input.source,
      input.externalId,
    );

    if (existing) {
      return existing;
    }

    return this.eventRepository.save(
      this.eventRepository.create({
        tenantId: input.tenantId,
        source: input.source,
        externalId: input.externalId,
        leadId: input.leadId ?? null,
      }),
    );
  }
}
