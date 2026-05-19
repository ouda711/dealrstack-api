import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DealrstackAiService } from '../ai/dealrstack-ai.service';
import { SalesLeadEntity } from '../sales/infrastructure/persistence/relational/entities/sales-lead.entity';

export type GrowthFeatureStatus = 'available' | 'beta' | 'planned';

export type GrowthFeatureDto = {
  id: string;
  title: string;
  description: string;
  status: GrowthFeatureStatus;
};

@Injectable()
export class GrowthService {
  constructor(
    private readonly aiService: DealrstackAiService,
    @InjectRepository(SalesLeadEntity)
    private readonly leadRepository: Repository<SalesLeadEntity>,
  ) {}

  listFeatures(): { features: GrowthFeatureDto[] } {
    return {
      features: [
        {
          id: 'ai_qualification',
          title: 'AI lead qualification',
          description:
            'Score intent, summarize conversations, and suggest next actions before escalation.',
          status: 'beta',
        },
        {
          id: 'financing',
          title: 'Financing workflows',
          description:
            'Capture finance interest, estimates, and deposit tracking tied to deals.',
          status: 'planned',
        },
        {
          id: 'social_posting',
          title: 'Social posting engine',
          description:
            'Generate and publish listings to Facebook, Instagram, and WhatsApp catalog.',
          status: 'planned',
        },
        {
          id: 'calendar_sync',
          title: 'External calendar sync',
          description:
            'Push appointments to Google Calendar. Outlook support is planned.',
          status: 'available',
        },
      ],
    };
  }

  async qualifyLead(tenantId: number, leadId: number, extraContext?: string) {
    const lead = await this.leadRepository.findOne({
      where: { id: leadId, tenantId },
    });

    if (!lead) {
      throw new NotFoundException({ error: 'leadNotFound' });
    }

    const systemPrompt =
      'You are a dealership sales assistant in Kenya. Reply with concise JSON only.';
    const userPrompt = `Qualify this lead for a car dealership.
Customer: ${lead.customerName}
Phone: ${lead.customerPhone}
Source: ${lead.source}
Interest: ${lead.interestSummary ?? 'Not provided'}
Status: ${lead.status}
${extraContext ? `Additional context: ${extraContext}` : ''}

Return JSON: {"intentScore":0-100,"summary":"...","recommendedAction":"...","urgency":"low|medium|high"}`;

    let qualification: Record<string, unknown> | null = null;
    let provider: string | null = null;

    try {
      const chunks: string[] = [];
      const result = await this.aiService.streamMarketingCopy(
        systemPrompt,
        userPrompt,
        (delta) => chunks.push(delta),
      );

      if (result?.fullText) {
        provider = result.provider;
        const raw = result.fullText.trim();
        const jsonStart = raw.indexOf('{');
        const jsonEnd = raw.lastIndexOf('}');

        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          qualification = JSON.parse(
            raw.slice(jsonStart, jsonEnd + 1),
          ) as Record<string, unknown>;
        } else {
          qualification = { summary: raw };
        }
      }
    } catch {
      qualification = {
        summary:
          'AI qualification is not configured. Add AI provider keys in settings to enable scoring.',
        intentScore: null,
        recommendedAction:
          'Contact the lead manually and log notes in the pipeline.',
        urgency: 'medium',
      };
    }

    return {
      leadId: lead.id,
      provider,
      qualification,
    };
  }
}
