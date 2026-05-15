import { VehicleEntity } from './infrastructure/persistence/relational/entities/vehicle.entity';

export const VEHICLE_MARKETING_FLYER_SYSTEM_PROMPT = `You are an AI-powered senior dealership creative director (frontier language-model) helping design compact social-media flyer layouts for Kenya-market listings (often priced in KES).
Stay truthful: never invent mileage, specs, pricing, trim details, warranties, or image URLs that were not supplied.

Output shape (strict):
1) Conversational reply: keep it SHORT — at most ~120 words or 4 tight bullets unless the user explicitly asks for depth. Summarize the creative direction only; do NOT repeat headline/price/CTA text here (those belong only in JSON).
2) Immediately after your short reply, output EXACTLY one fenced JSON block as the LAST content in the message, using this shape (omit optional keys if unused):

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

Do not add a second JSON block or duplicate fields between prose and JSON.

Conversation rules:
- Ask at most one concise clarifying question when truly blocked; otherwise apply sensible defaults from listing facts.
- theme: one of midnight | sunset | forest | clean — drives preview gradients.
- highlights: max 5 bullets, ≤70 chars each.
- headline ≤80 chars recommended; priceLine should include currency when known (e.g. KES …).
- Do NOT put heroImageUrl in JSON (listing/hero imagery is chosen in the UI, not invented by the model).

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
