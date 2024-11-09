import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@/lib/jwt';
import { UnauthorizedError } from '../exceptions/Unauthorized';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('Access token required');
  }

  const decodedToken = verifyAccessToken(token);
  if (!decodedToken) {
    throw new UnauthorizedError('Invalid or expired access token');
  }

  req.user = decodedToken;

  next();
}
