import {
  normalizeFlyerArtifactParsed,
  parseFlyerArtifactFromText,
} from './vehicle-marketing-flyer-artifact.util';

describe('parseFlyerArtifactFromText', () => {
  it('should parse last fenced JSON block and normalize', () => {
    const text = `Here is an idea.\n\`\`\`json\n{"headline":"Hi","priceLine":"KES 1","theme":"forest"}\n\`\`\``;
    expect(parseFlyerArtifactFromText(text)).toEqual({
      headline: 'Hi',
      priceLine: 'KES 1',
      theme: 'forest',
    });
  });

  it('should return null without fenced JSON', () => {
    expect(parseFlyerArtifactFromText('no json')).toBeNull();
  });

  it('should return null when headline or price missing', () => {
    expect(
      parseFlyerArtifactFromText(
        '```json\n{"headline":"","priceLine":"x"}\n```',
      ),
    ).toBeNull();
  });

  it('should drop invalid theme', () => {
    const out = parseFlyerArtifactFromText(
      '```json\n{"headline":"A","priceLine":"B","theme":"neon"}\n```',
    );
    expect(out).toEqual({ headline: 'A', priceLine: 'B' });
  });

  it('should accept optional https hero URL', () => {
    const out = parseFlyerArtifactFromText(
      '```json\n{"headline":"A","priceLine":"B","heroImageUrl":"https://cdn.example/a.jpg"}\n```',
    );
    expect(out?.heroImageUrl).toBe('https://cdn.example/a.jpg');
  });

  it('should drop non-http hero URLs', () => {
    const out = parseFlyerArtifactFromText(
      '```json\n{"headline":"A","priceLine":"B","heroImageUrl":"javascript:alert(1)"}\n```',
    );
    expect(out).not.toHaveProperty('heroImageUrl');
  });
});

describe('normalizeFlyerArtifactParsed', () => {
  it('should trim highlights', () => {
    expect(
      normalizeFlyerArtifactParsed({
        headline: ' X ',
        priceLine: ' Y ',
        highlights: [' a ', 'b', ''],
      }),
    ).toEqual({
      headline: 'X',
      priceLine: 'Y',
      highlights: ['a', 'b'],
    });
  });
});
