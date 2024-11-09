import { Router } from 'express';

import { AuthTokenRepository } from '@/app/repositories/AuthTokenRepository';
import { PasswordResetTokenRepository } from '@/app/repositories/PasswordResetTokenRepository';
import { UserRepository } from '@/app/repositories/UserRepository';
import { VerificationTokenRepository } from '@/app/repositories/VerificationTokenRepository';

import { AuthService } from '@/app/services/AuthService';
import { AuthenticatedSessionController } from '@/app/controllers/auth/AutenticatedSessionController';
import { EmailVerificationController } from '@/app/controllers/auth/EmailVerificationController';
import { PasswordResetLinkController } from '@/app/controllers/auth/PasswordResetLinkController';
import { RegisterUserController } from '@/app/controllers/auth/RegisterUserController';
import { NewPasswordController } from '@/app/controllers/auth/NewPasswordController';

export const authRoutes = Router();

const userRepository = new UserRepository();
const authTokenRepository = new AuthTokenRepository();
const verificationTokenRepository = new VerificationTokenRepository();
const passwordResetTokenRepository = new PasswordResetTokenRepository();

const authService = new AuthService(userRepository, verificationTokenRepository, authTokenRepository, passwordResetTokenRepository);

const registerUserController = new RegisterUserController(authService);
const emailVerificationController = new EmailVerificationController(authService);
const authenticatedSessionController = new AuthenticatedSessionController(authService);
const passwordResetLinkController = new PasswordResetLinkController(authService);
const newPasswordController = new NewPasswordController(authService);

authRoutes.post('/register', registerUserController.store);
authRoutes.post('/verify-email', emailVerificationController.update);
authRoutes.post('/login', authenticatedSessionController.store);
authRoutes.post('/refresh-token', authenticatedSessionController.update);
authRoutes.post('/forgot-password', passwordResetLinkController.store);
authRoutes.post('/new-password', newPasswordController.store);
