import { Router } from 'express';
import { RegisterUserController } from '@/app/controllers/auth/RegisterUserController';
import { AuthService } from '@/app/services/AuthService';
import { UserRepository } from '@/app/repositories/UserRepository';
import { VerificationTokenRepository } from '@/app/repositories/VerificationTokenRepository';
import { EmailVerificationController } from '@/app/controllers/auth/EmailVerificationController';
import { AuthTokenRepository } from '@/app/repositories/AuthTokenRepository';
import { AuthenticatedSessionController } from '@/app/controllers/auth/AutenticatedSessionController';

export const authRoutes = Router();
const userRepository = new UserRepository();
const verificationTokenRepository = new VerificationTokenRepository();
const authTokenRepository = new AuthTokenRepository();

const authService = new AuthService(
  userRepository,
  verificationTokenRepository,
  authTokenRepository
);

const registerUserController = new RegisterUserController(authService);
const emailVerificationController = new EmailVerificationController(
  authService
);
const authenticatedSessionController = new AuthenticatedSessionController(
  authService
);

authRoutes.post('/register', registerUserController.store);
authRoutes.post('/verify-email', emailVerificationController.update);
authRoutes.post('/login', authenticatedSessionController.store);
authRoutes.post('/refresh-token', authenticatedSessionController.update);
