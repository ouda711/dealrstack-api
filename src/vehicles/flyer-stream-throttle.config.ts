/** Env-driven rate limit for POST …/marketing/flyer-threads/:id/stream (SSE). */
const ttlRaw = Number(process.env.FLYER_STREAM_THROTTLE_TTL_MS ?? 60000);
const limitRaw = Number(process.env.FLYER_STREAM_THROTTLE_LIMIT ?? 30);

export const FLYER_STREAM_THROTTLE = {
  name: 'flyer-stream' as const,
  ttl: Number.isFinite(ttlRaw) && ttlRaw > 0 ? ttlRaw : 60000,
  limit: Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : 30,
};
