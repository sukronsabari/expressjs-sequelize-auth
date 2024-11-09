import * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface AuthTokenPayload {
  id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: (JwtPayload & AuthTokenPayload) | undefined;
    }
  }
}
