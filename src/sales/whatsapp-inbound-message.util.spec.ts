import {
  parseInboundWhatsAppContent,
  type InboundWhatsAppMessage,
} from './whatsapp-inbound-message.util';

describe('parseInboundWhatsAppContent', () => {
  it('should parse text messages', () => {
    const message: InboundWhatsAppMessage = {
      from: '254712345678',
      id: 'wamid.1',
      timestamp: '1710000000',
      type: 'text',
      text: { body: 'Hello' },
    };

    expect(parseInboundWhatsAppContent(message)).toEqual({
      body: 'Hello',
      mediaType: null,
    });
  });

  it('should parse image messages with caption', () => {
    const message: InboundWhatsAppMessage = {
      from: '254712345678',
      id: 'wamid.2',
      timestamp: '1710000000',
      type: 'image',
      image: { caption: 'Vehicle photo' },
    };

    expect(parseInboundWhatsAppContent(message)).toEqual({
      body: 'Vehicle photo',
      mediaType: 'image',
    });
  });

  it('should parse voice notes as audio', () => {
    const message: InboundWhatsAppMessage = {
      from: '254712345678',
      id: 'wamid.3',
      timestamp: '1710000000',
      type: 'audio',
      audio: { voice: true },
    };

    expect(parseInboundWhatsAppContent(message)?.mediaType).toBe('audio');
  });
});
