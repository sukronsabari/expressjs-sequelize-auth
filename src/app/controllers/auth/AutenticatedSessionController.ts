import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AuthService } from '@/app/services/AuthService';
import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';

import { loginSchema } from '@/app/schemas/LoginSchema';
import { refreshAuthTokenSchema } from '@/app/schemas/RefreshAuthTokenSchema';

export class AuthenticatedSessionController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  public store = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validatedPayload = loginSchema.parse(req.body);

    const { accessToken, refreshToken } = await this._authService.login(validatedPayload);

    const response: ApiResponseDTO = {
      message: 'Logged in successfully',
      status: 'success',
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    };
    res.status(200).json(response);
  });
}
