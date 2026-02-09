const buckets = new Map();

// Nettoie les anciennes requêtes en dehors de la fenêtre de temps
function cleanupBucket(bucket, now, windowMs) {
  const cutoff = now - windowMs;
  while (bucket.timestamps.length && bucket.timestamps[0] < cutoff) {
    bucket.timestamps.shift();
  }
}

// Middleware de limitation de requêtes (rate limiting)
export function rateLimit({ windowMs = 60000, max = 10, keyPrefix = 'rl' } = {}) {
  return (req, res, next) => {
    const now = Date.now();
    const key = `${keyPrefix}:${req.ip}`;
    const bucket = buckets.get(key) || { timestamps: [] };

    cleanupBucket(bucket, now, windowMs);

    if (bucket.timestamps.length >= max) {
      return res.status(429).json({
        message: 'Trop de requêtes, réessaie plus tard.',
        code: 'RATE_LIMITED'
      });
    }

    bucket.timestamps.push(now);
    buckets.set(key, bucket);
    return next();
  };
}
