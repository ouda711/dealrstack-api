export const SHARE_CHANNELS = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'twitter', label: 'X / Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'direct', label: 'Direct link' },
] as const;

export const ALLOWED_LISTING_REFERRERS = new Set([
  'dealrstack',
  'facebook',
  'whatsapp',
  'instagram',
  'twitter',
  'linkedin',
  'tiktok',
  'youtube',
  'telegram',
  'email',
  'sms',
  'direct',
  'other',
]);

export const REFERRER_ALIASES: Record<string, string> = {
  x: 'twitter',
  x_com: 'twitter',
};

export function normalizeListingReferrer(referrer?: string | null): string {
  if (!referrer || typeof referrer !== 'string') {
    return 'direct';
  }

  let slug = referrer
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/\./g, '_');

  slug = REFERRER_ALIASES[slug] ?? slug;

  return ALLOWED_LISTING_REFERRERS.has(slug) ? slug : 'other';
}
