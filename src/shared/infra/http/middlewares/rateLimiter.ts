import { Request, Response, NextFunction } from 'express'
import Redis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

import cache from '@config/cache'
import AppError from '@shared/errors/AppError'

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const redisClient = new Redis(cache.config.redis)

        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: 'ratelimit',
            points: 5,
            duration: 10,
        })

        await limiter.consume(request.ip)

        return next()
    } catch (err) {
        throw new AppError('Too many requests.', 429)
    }
}
