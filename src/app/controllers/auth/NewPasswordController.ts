import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';
import { AuthService } from '@/app/services/AuthService';
import { newPasswordSchema } from '@/app/schemas/NewPasswordSchema';

export class NewPasswordController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  public store = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validatedPayload = newPasswordSchema.parse(req.body);

    await this._authService.setNewPassword(validatedPayload);

    const response: ApiResponseDTO = {
      status: 'success',
      message: 'The password has been changed successfully.',
    };
    res.status(200).json(response);
  });
}
