import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';
import { EmailVerificationSchema } from '@/app/schemas/EmailVerificationSchema';
import { AuthService } from '@/app/services/AuthService';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export class EmailVerificationController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  public update = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const validatedPayload = EmailVerificationSchema.parse(req.body);

      await this._authService.verifyEmail(validatedPayload);

      const response: ApiResponseDTO = {
        status: 'success',
        message: 'Email verification successful! Your account is now active.',
      };
      res.status(200).json(response);
    }
  );
}
