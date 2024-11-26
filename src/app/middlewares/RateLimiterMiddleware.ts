import { Request, Response, NextFunction } from 'express';
import { cacheClient } from '@/lib/cache';
import { TooManyRequestError } from '@/app/exceptions/TooManyRequest';

interface RateLimitOptions {
  key: (req: Request) => string;
  limit: number;
  windowMs: number;
  message: string;
}

export function rateLimiter({ key, limit, windowMs, message }: RateLimitOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const keyValue = key(req);
    const cacheKey = `rate-limit:${keyValue}`;

    try {
      const requests = await cacheClient.incr(cacheKey);

      if (requests === 1) {
        await cacheClient.expire(cacheKey, windowMs / 1000);
      }

      if (requests > limit) {
        throw new TooManyRequestError(message);
      }

      console.log('RATE LIMITING RUNNING FOR: ', keyValue);
      next();
    } catch (error) {
      console.error('Rate Limiting Error:', error);
      next(error);
    }
  };
}
