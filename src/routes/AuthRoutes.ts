import { Router } from 'express';

import { PasswordResetTokenRepository } from '@/app/repositories/PasswordResetTokenRepository';
import { UserRepository } from '@/app/repositories/UserRepository';
import { VerificationTokenRepository } from '@/app/repositories/VerificationTokenRepository';
import { AuthService } from '@/app/services/AuthService';
import { AuthenticatedSessionController } from '@/app/controllers/Auth/AutenticatedSessionController';
import { EmailVerificationController } from '@/app/controllers/Auth/EmailVerificationController';
import { NewPasswordController } from '@/app/controllers/Auth/NewPasswordController';
import { PasswordResetLinkController } from '@/app/controllers/Auth/PasswordResetLinkController';
import { RegisterUserController } from '@/app/controllers/Auth/RegisterUserController';

export const authRoutes = Router();

const userRepository = new UserRepository();
const verificationTokenRepository = new VerificationTokenRepository();
const passwordResetTokenRepository = new PasswordResetTokenRepository();

const authService = new AuthService(userRepository, verificationTokenRepository, passwordResetTokenRepository);

const registerUserController = new RegisterUserController(authService);
const emailVerificationController = new EmailVerificationController(authService);
const authenticatedSessionController = new AuthenticatedSessionController(authService);
const passwordResetLinkController = new PasswordResetLinkController(authService);
const newPasswordController = new NewPasswordController(authService);

authRoutes.post('/register', registerUserController.store);
authRoutes.post('/verify-email', emailVerificationController.update);
authRoutes.post('/login', authenticatedSessionController.store);
authRoutes.post('/forgot-password', passwordResetLinkController.store);
authRoutes.post('/new-password', newPasswordController.store);
