import 'dotenv/config';
import Redis from 'ioredis';

export const cacheClient = new Redis({
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

cacheClient.on('error', (error) => {
  console.error('Redis connection error:', error);
});

cacheClient.on('connect', () => {
  console.log('Redis connected successfully.');
});

cacheClient.on('reconnecting', (time: number) => {
  console.log(`Redis reconnecting in ${time} ms...`);
});

cacheClient.on('end', () => {
  console.log('Redis connection closed.');
});
