import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../exceptions/Forbidden';

export async function roleMiddleware(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || typeof req.user !== 'object') {
      throw new ForbiddenError('Unauthorized access');
    }

    const userRoles = req.user.roles || [];
    const hasRole = roles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenError('Forbidden: insufficient role');
    }

    next();
  };
}
