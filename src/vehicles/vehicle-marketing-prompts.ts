import type { VehicleMarketingPurpose } from './dto/vehicle-marketing-generate.dto';
import { VehicleEntity } from './infrastructure/persistence/relational/entities/vehicle.entity';

export const VEHICLE_MARKETING_SYSTEM_PROMPT = `You are an expert automotive retail copywriter for dealerships in Kenya (prices often in KES).
Write concise, accurate marketing copy using only facts provided by the user.
Do not invent specifications, pricing, or availability.
Match the requested format exactly (length and channel norms).
When hashtags are requested, output a single line of space-separated hashtags starting with #.`;

export function buildVehicleMarketingUserPrompt(
  vehicle: VehicleEntity,
  purpose: VehicleMarketingPurpose,
  tone: string,
): string {
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
    ...(vehicle.equipment || []).slice(0, 8),
  ].filter(Boolean);

  const facts = [
    `Vehicle title: ${title}`,
    vehicle.year ? `Year: ${vehicle.year}` : null,
    `Make / model: ${vehicle.make} ${vehicle.model}`,
    `Price: ${priceLabel}`,
    mileageLabel ? `Mileage: ${mileageLabel}` : null,
    vehicle.exteriorColor ? `Exterior: ${vehicle.exteriorColor}` : null,
    vehicle.bodyType ? `Body: ${vehicle.bodyType}` : null,
    vehicle.description?.trim()
      ? `Dealer notes: ${vehicle.description.trim()}`
      : null,
    highlights.length
      ? `Highlights / equipment (use sparingly): ${highlights.join('; ')}`
      : null,
  ]
    .filter(Boolean)
    .join('\n');

  const purposeGuide: Record<VehicleMarketingPurpose, string> = {
    instagram_caption:
      'Write an Instagram caption (under ~2200 chars). Friendly line breaks; optional emoji sparingly; end with a soft CTA.',
    facebook_post:
      'Write a Facebook post (2–4 short paragraphs). Conversational; include CTA to message or visit.',
    whatsapp_status:
      'Write a single short WhatsApp status (max ~400 chars). Punchy; invite replies.',
    flyer_copy:
      'Write structured flyer copy with clear HEADLINE, PRICE, DETAILS (bullet-ish lines), and CTA sections.',
    hashtags:
      'Output hashtags only: one line, space-separated, each starting with #. Max 12 tags; mix brand/model/year + generic used-car discovery tags relevant to Kenya.',
    twitter_post:
      'Write an X/Twitter post max 260 characters including hashtags if any.',
  };

  return [
    `Tone: ${tone}`,
    `Channel / purpose: ${purpose}`,
    purposeGuide[purpose],
    '',
    'Listing facts:',
    facts,
  ].join('\n');
}
