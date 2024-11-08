import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'your-access-token-secret';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret';

const ACCESS_TOKEN_EXPIRATION = '15m'; // 15 minutes for access token
const REFRESH_TOKEN_EXPIRATION = '30d'; // 30 days for refresh token

export interface AuthTokenPayload {
  id: string;
  name: string;
  email: string;
}

export const generateAccessToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

export const generateRefreshToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

export const verifyAccessToken = (token: string): AuthTokenPayload | null => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as AuthTokenPayload;
  } catch (error) {
    console.error('Access Token verification failed:', error);
    return null;
  }
};

export const verifyRefreshToken = (token: string): AuthTokenPayload | null => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as AuthTokenPayload;
  } catch (error) {
    console.error('Refresh Token verification failed:', error);
    return null;
  }
};

export const decodeToken = (token: string): AuthTokenPayload | null => {
  try {
    return jwt.decode(token) as AuthTokenPayload;
  } catch (error) {
    console.error('Token decoding failed:', error);
    return null;
  }
};
