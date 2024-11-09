import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AuthService } from '@/app/services/AuthService';
import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';
import { emailVerificationSchema } from '@/app/schemas/EmailVerificationSchema';

export class EmailVerificationController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  public update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validatedPayload = emailVerificationSchema.parse(req.body);

    await this._authService.verifyEmail(validatedPayload);

    const response: ApiResponseDTO = {
      status: 'success',
      message: 'Email verification successful! Your account is now active.',
    };
    res.status(200).json(response);
  });
}
