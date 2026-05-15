const THEMES = new Set(['midnight', 'sunset', 'forest', 'clean']);

/** Max URL length aligned with typical CDN/object-storage URLs */
const MAX_HERO_URL_LEN = 2048;

export function normalizeFlyerArtifactParsed(
  raw: Record<string, unknown>,
): Record<string, unknown> | null {
  if (
    !raw ||
    typeof raw.headline !== 'string' ||
    typeof raw.priceLine !== 'string'
  ) {
    return null;
  }
  const headline = raw.headline.trim();
  const priceLine = raw.priceLine.trim();
  if (!headline || !priceLine) {
    return null;
  }

  const out: Record<string, unknown> = { headline, priceLine };

  if (typeof raw.tagline === 'string' && raw.tagline.trim()) {
    out.tagline = raw.tagline.trim();
  }
  if (typeof raw.specsLine === 'string' && raw.specsLine.trim()) {
    out.specsLine = raw.specsLine.trim();
  }
  if (typeof raw.cta === 'string' && raw.cta.trim()) {
    out.cta = raw.cta.trim();
  }

  if (typeof raw.theme === 'string' && THEMES.has(raw.theme)) {
    out.theme = raw.theme;
  }

  if (Array.isArray(raw.highlights)) {
    const bullets = raw.highlights
      .filter((h): h is string => typeof h === 'string')
      .map((h) => h.trim())
      .filter(Boolean)
      .slice(0, 5);
    if (bullets.length) {
      out.highlights = bullets;
    }
  }

  if (typeof raw.heroImageUrl === 'string') {
    const u = raw.heroImageUrl.trim();
    if (
      u.length > 0 &&
      u.length <= MAX_HERO_URL_LEN &&
      (u.startsWith('https://') || u.startsWith('http://'))
    ) {
      out.heroImageUrl = u;
    }
  }

  return out;
}

export function parseFlyerArtifactFromText(
  fullText: string,
): Record<string, unknown> | null {
  const matches = [...fullText.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi)];
  if (!matches.length) {
    return null;
  }
  const inner = matches[matches.length - 1]?.[1]?.trim();
  if (!inner) {
    return null;
  }
  try {
    const obj = JSON.parse(inner) as Record<string, unknown>;
    return normalizeFlyerArtifactParsed(obj);
  } catch {
    return null;
  }
}
