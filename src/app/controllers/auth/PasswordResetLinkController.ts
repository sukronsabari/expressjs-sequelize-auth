import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';
import { AuthService } from '@/app/services/AuthService';
import { sendPasswordResetLinkSchema } from '@/app/schemas/SendPasswordResetLinkSchema';

export class PasswordResetLinkController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  public store = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validatedPayload = sendPasswordResetLinkSchema.parse(req.body);

    await this._authService.sendPasswordResetLink(validatedPayload);

    const response: ApiResponseDTO = {
      status: 'success',
      message: 'Password reset link has been sent.',
    };
    res.status(200).json(response);
  });
}
