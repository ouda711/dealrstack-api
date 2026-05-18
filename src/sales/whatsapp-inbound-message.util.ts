export type InboundWhatsAppMessage = {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body?: string };
  image?: { caption?: string; mime_type?: string };
  document?: { caption?: string; filename?: string; mime_type?: string };
  audio?: { mime_type?: string; voice?: boolean };
  video?: { caption?: string; mime_type?: string };
  sticker?: { mime_type?: string };
};

export type ParsedInboundWhatsAppContent = {
  body: string;
  mediaType: 'image' | 'document' | 'audio' | 'video' | null;
};

export function parseInboundWhatsAppContent(
  message: InboundWhatsAppMessage,
): ParsedInboundWhatsAppContent | null {
  switch (message.type) {
    case 'text': {
      const body = message.text?.body?.trim();

      if (!body) {
        return null;
      }

      return { body, mediaType: null };
    }
    case 'image':
      return {
        body: message.image?.caption?.trim() || 'Sent an image',
        mediaType: 'image',
      };
    case 'sticker':
      return {
        body: 'Sent a sticker',
        mediaType: 'image',
      };
    case 'document':
      return {
        body:
          message.document?.caption?.trim() ||
          `Sent a document${message.document?.filename ? `: ${message.document.filename}` : ''}`,
        mediaType: 'document',
      };
    case 'audio':
      return {
        body: message.audio?.voice
          ? 'Sent a voice message'
          : 'Sent an audio message',
        mediaType: 'audio',
      };
    case 'video':
      return {
        body: message.video?.caption?.trim() || 'Sent a video',
        mediaType: 'video',
      };
    default:
      return {
        body: `Sent a ${message.type} message`,
        mediaType: 'document',
      };
  }
}
