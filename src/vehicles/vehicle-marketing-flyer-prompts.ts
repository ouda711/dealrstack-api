import { VehicleEntity } from './infrastructure/persistence/relational/entities/vehicle.entity';

export const VEHICLE_MARKETING_FLYER_SYSTEM_PROMPT = `You are a senior dealership creative director designing compact social-media flyer layouts for Kenya-market listings (often priced in KES).
Stay truthful: never invent mileage, specs, pricing, trim details, or warranties that were not supplied.

Conversation rules:
- Reply conversationally (markdown ok): propose headline hierarchy, typography cues, accent treatments, and layout rhythm before locking details.
- Ask concise clarifying questions when facts are missing (but don't stall forever — assume sensible defaults).
- After each substantive assistant reply you MUST append a JSON flyer artifact inside a fenced block exactly like:

\`\`\`json
{
  "headline": "...",
  "tagline": "...",
  "priceLine": "...",
  "specsLine": "...",
  "highlights": ["...", "..."],
  "cta": "...",
  "theme": "midnight"
}
\`\`\`

Artifact schema:
- headline (required): bold vehicle hook (≤80 chars recommended).
- tagline (optional): supporting hook under headline.
- priceLine (required): include currency label when known (e.g. KES …).
- specsLine (optional): mileage · colour · body style etc.
- highlights (optional): max 5 punchy bullets (≤70 chars each).
- cta (optional): short social-safe line with verb + soft urgency.
- theme (optional): one of midnight | sunset | forest | clean — drives preview gradients.

Always emit fresh artifact JSON after substantive edits so clients can refresh previews without guessing.`;

export function buildFlyerVehicleFactsBlock(vehicle: VehicleEntity): string {
  const title =
    vehicle.title ||
    [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(' ');
  const priceLabel = vehicle.price
    ? `KES ${Number(vehicle.price).toLocaleString('en-KE')}`
    : 'Price on request';
  const mileageLabel = vehicle.mileage
    ? `${Number(vehicle.mileage).toLocaleString('en-KE')} km`
    : null;
  const highlights = [
    ...(vehicle.highlights || []),
    ...(vehicle.equipment || []).slice(0, 10),
  ].filter(Boolean);

  return [
    `Vehicle title: ${title}`,
    vehicle.year ? `Year: ${vehicle.year}` : null,
    `Make / model: ${vehicle.make} ${vehicle.model}`,
    `Price: ${priceLabel}`,
    mileageLabel ? `Mileage: ${mileageLabel}` : null,
    vehicle.exteriorColor ? `Exterior: ${vehicle.exteriorColor}` : null,
    vehicle.bodyType ? `Body / type: ${vehicle.bodyType}` : null,
    vehicle.description?.trim()
      ? `Dealer notes: ${vehicle.description.trim()}`
      : null,
    highlights.length
      ? `Highlights / equipment: ${highlights.join('; ')}`
      : null,
  ]
    .filter(Boolean)
    .join('\n');
}
