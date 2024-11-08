import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';
import { LoginSchema } from '@/app/schemas/LoginSchema';
import { RefreshAuthTokenSchema } from '@/app/schemas/RefreshAuthTokenSchema';
import { AuthService } from '@/app/services/AuthService';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export class AuthenticatedSessionController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  public store = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const validatedPayload = LoginSchema.parse(req.body);

      const { accessToken, refreshToken } =
        await this._authService.login(validatedPayload);

      const response: ApiResponseDTO = {
        message: 'Logged in successfully',
        status: 'success',
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      };
      res.status(200).json(response);
    }
  );

  public update = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const validatedPayload = RefreshAuthTokenSchema.parse(req.body);

      const newAccessToken =
        await this._authService.refreshAuthToken(validatedPayload);

      const response: ApiResponseDTO = {
        message: 'New refresh token has been generated',
        status: 'success',
        data: {
          access_token: newAccessToken,
        },
      };
      res.status(200).json(response);
    }
  );
}
