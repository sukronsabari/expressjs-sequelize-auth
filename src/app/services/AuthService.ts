import bcrypt from 'bcryptjs';

import { generateAccessToken, generateRefreshToken, verifyRefreshToken, type AuthTokenPayload } from '@/lib/jwt';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';

import { PasswordResetTokenRepository } from '@/app/repositories/PasswordResetTokenRepository';
import { UserRepository } from '@/app/repositories/UserRepository';
import { VerificationTokenRepository } from '@/app/repositories/VerificationTokenRepository';

import { BadRequestError } from '@/app/exceptions/BadRequest';
import { ForbiddenError } from '@/app/exceptions/Forbidden';
import { InternalServerError } from '@/app/exceptions/InternalServerError';
import { UnauthorizedError } from '@/app/exceptions/Unauthorized';

import { LoginDTO } from '@/app/dtos/auth/LoginDTO';
import { NewPasswordDTO } from '@/app/dtos/auth/NewPasswordDTO';
import { RefreshAuthTokenDTO } from '@/app/dtos/auth/RefreshAuthTokenDTO';
import { RegisterDTO } from '@/app/dtos/auth/RegisterDTO';
import { SendPasswordResetLinkDTO } from '@/app/dtos/auth/SendPasswordResetLinkDTO';
import { VerifyEmailDTO } from '@/app/dtos/auth/VerifyEmailDTO';

export class AuthService {
  private _userRepository: UserRepository;
  private _verificationTokenRepository: VerificationTokenRepository;
  private _passwordResetTokenRepository: PasswordResetTokenRepository;

  constructor(
    userRepository: UserRepository,
    verificationTokenRepository: VerificationTokenRepository,
    passwordResetTokenRepository: PasswordResetTokenRepository
  ) {
    this._userRepository = userRepository;
    this._verificationTokenRepository = verificationTokenRepository;
    this._passwordResetTokenRepository = passwordResetTokenRepository;
  }

  public register = async (payload: RegisterDTO) => {
    const existingUser = await this._userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new BadRequestError('Email already exist, please use different email');
    }

    await this._userRepository.create(payload);
    const verificationToken = await this._verificationTokenRepository.generate(payload.email);

    if (verificationToken) {
      await sendVerificationEmail(payload.email, verificationToken.token);
    }
  };

  public verifyEmail = async (payload: VerifyEmailDTO) => {
    const verificationToken = await this._verificationTokenRepository.findByToken(payload.token);

    if (!verificationToken) {
      throw new BadRequestError('Invalid or expired verification token');
    }

    const expirationTime = new Date(verificationToken.expires).getTime();
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      throw new BadRequestError('Verification token has been expired');
    }

    const user = await this._userRepository.findByEmail(verificationToken.email);

    if (!user) {
      throw new BadRequestError('Your account not found in system');
    }

    await this._userRepository.activateUser(verificationToken.email);
    await this._verificationTokenRepository.destroy(verificationToken.id);
  };

  public login = async (payload: LoginDTO) => {
    const user = await this._userRepository.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (!user.password) {
      throw new ForbiddenError('Invalid login method');
    }

    if (!user.email_verified) {
      throw new BadRequestError('Your account is not active, check your mail to active your account');
    }

    const passwordMatch = await bcrypt.compare(payload.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const authTokenPayload: AuthTokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const accessToken = generateAccessToken(authTokenPayload);
    const refreshToken = generateRefreshToken(authTokenPayload);

    return { accessToken, refreshToken };
  };


  public sendPasswordResetLink = async (payload: SendPasswordResetLinkDTO) => {
    const user = await this._userRepository.findByEmail(payload.email);

    if (!user) {
      throw new BadRequestError('Email not registered in system');
    }

    const passwordResetToken = await this._passwordResetTokenRepository.generate(user.email);

    if (passwordResetToken) {
      await sendPasswordResetEmail(payload.email, passwordResetToken.token);
    }
  };

  public setNewPassword = async (payload: NewPasswordDTO) => {
    const passwordResetToken = await this._passwordResetTokenRepository.findByToken(payload.token);

    if (!passwordResetToken) {
      throw new BadRequestError('Invalid or expired password reset token');
    }

    const expirationTime = new Date(passwordResetToken.expires).getTime();
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      throw new BadRequestError('Password reset token has been expired');
    }

    const user = await this._userRepository.findByEmail(passwordResetToken.email);

    if (!user) {
      throw new BadRequestError('Your account not found in system');
    }

    const updatedUser = await this._userRepository.changePassword(passwordResetToken.email, payload.password);
    if (!updatedUser) {
      throw new InternalServerError('Server Error');
    }
    await this._passwordResetTokenRepository.destroy(passwordResetToken.id);
  };
}
