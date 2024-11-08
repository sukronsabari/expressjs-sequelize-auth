import { RegisterDTO } from '@/app/dtos/auth/RegisterDTO';
import { BadRequestError } from '@/app/exceptions/BadRequest';
import { UserRepository } from '@/app/repositories/UserRepository';
import { sendVerificationEmail } from '@/lib/mail';
import { VerificationTokenRepository } from '../repositories/VerificationTokenRepository';
import { VerifyEmailDTO } from '../dtos/auth/VerifyEmailDTO';
import { LoginDTO } from '../dtos/auth/LoginDTO';
import { UnauthorizedError } from '../exceptions/Unauthorized';
import { compare } from 'bcryptjs';
import { ForbiddenError } from '../exceptions/Forbidden';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  type AuthTokenPayload,
} from '@/lib/jwt';
import { AuthTokenRepository } from '../repositories/AuthTokenRepository';
import { RefreshAuthTokenDTO } from '../dtos/auth/RefreshAuthTokenDTO';

export class AuthService {
  private _userRepository: UserRepository;
  private _verificationTokenRepository: VerificationTokenRepository;
  private _authTokenRepository: AuthTokenRepository;

  constructor(
    userRepository: UserRepository,
    verificationTokenRepository: VerificationTokenRepository,
    authTokenRepository: AuthTokenRepository
  ) {
    this._userRepository = userRepository;
    this._verificationTokenRepository = verificationTokenRepository;
    this._authTokenRepository = authTokenRepository;
  }

  public register = async (payload: RegisterDTO) => {
    const existingUser = await this._userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new BadRequestError(
        'Email already exist, please use different email'
      );
    }

    await this._userRepository.create(payload);
    const verificationToken = await this._verificationTokenRepository.generate(
      payload.email
    );

    if (verificationToken) {
      await sendVerificationEmail(payload.email, verificationToken.token);
    }
  };

  public verifyEmail = async (payload: VerifyEmailDTO) => {
    const verificationToken =
      await this._verificationTokenRepository.findByToken(payload.token);

    if (!verificationToken) {
      throw new BadRequestError('Invalid or expired verification token');
    }

    const expirationTime = new Date(verificationToken.expires).getTime();
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      throw new BadRequestError('Verification token has expired');
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
      throw new BadRequestError(
        'Your account is not active, check your mail to active your account'
      );
    }

    const passwordMatch = compare(payload.password, user.password);

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

    await this._authTokenRepository.create({
      user_id: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      refresh_token: refreshToken,
    });

    return { accessToken, refreshToken };
  };

  public refreshAuthToken = async (payload: RefreshAuthTokenDTO) => {
    const decodedTokenPayload = verifyRefreshToken(payload.refresh_token);

    if (!decodedTokenPayload) {
      throw new ForbiddenError('Invalid or expired refresh token');
    }

    const activeAuthToken = await this._authTokenRepository.findActiveToken(
      decodedTokenPayload.id,
      payload.refresh_token
    );

    if (!activeAuthToken) {
      throw new ForbiddenError(
        'Invalid or expired refresh token, please login again'
      );
    }

    const newAccessToken = generateAccessToken({
      id: decodedTokenPayload.id,
      name: decodedTokenPayload.name,
      email: decodedTokenPayload.email,
    });

    return newAccessToken;
  };
}
