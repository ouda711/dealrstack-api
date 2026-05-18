import { ConversationTemplatePresetDto } from './dto/conversation-template-preset.dto';
import { SalesConversationPresetsDto } from './dto/sales-conversation-presets.dto';

export const DEFAULT_TEMPLATE_BODIES: Record<string, string> = {
  'Availability + price':
    'Hello! Yes, this vehicle is still available at the listed price. Would you like to schedule a viewing?',
  'Financing options':
    'We offer flexible financing options. Share your budget and we can prepare a quote for you.',
  'Trade-in valuation':
    'We can value your trade-in. Please share the make, model, year, and mileage.',
};

export const DEFAULT_CONVERSATION_PRESETS: SalesConversationPresetsDto = {
  quickReplies: [
    'Karibu! How can we help you today?',
    'Yes, the vehicle is still available.',
    'Would you like to book a test drive?',
  ],
  templates: [
    {
      label: 'Availability + price',
      body: DEFAULT_TEMPLATE_BODIES['Availability + price'],
    },
    {
      label: 'Financing options',
      body: DEFAULT_TEMPLATE_BODIES['Financing options'],
    },
    {
      label: 'Trade-in valuation',
      body: DEFAULT_TEMPLATE_BODIES['Trade-in valuation'],
    },
  ],
};

export function normalizeConversationPresets(
  stored: unknown,
): SalesConversationPresetsDto {
  if (!stored || typeof stored !== 'object') {
    return DEFAULT_CONVERSATION_PRESETS;
  }

  const value = stored as {
    quickReplies?: unknown;
    templates?: unknown;
  };

  const quickReplies = Array.isArray(value.quickReplies)
    ? value.quickReplies.filter(
        (item): item is string =>
          typeof item === 'string' && item.trim().length > 0,
      )
    : DEFAULT_CONVERSATION_PRESETS.quickReplies;

  const templates = normalizeTemplatePresets(value.templates);

  return { quickReplies, templates };
}

export function normalizeTemplatePresets(
  raw: unknown,
): ConversationTemplatePresetDto[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return DEFAULT_CONVERSATION_PRESETS.templates;
  }

  const templates: ConversationTemplatePresetDto[] = [];

  for (const item of raw) {
    if (typeof item === 'string' && item.trim()) {
      const label = item.trim();
      templates.push({
        label,
        body: DEFAULT_TEMPLATE_BODIES[label] ?? label,
      });
      continue;
    }

    if (item && typeof item === 'object') {
      const record = item as { label?: unknown; body?: unknown };
      const label = typeof record.label === 'string' ? record.label.trim() : '';
      const body = typeof record.body === 'string' ? record.body.trim() : '';

      if (label && body) {
        templates.push({ label, body });
      }
    }
  }

  return templates.length ? templates : DEFAULT_CONVERSATION_PRESETS.templates;
}
