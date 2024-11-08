import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';
import { RegisterSchema } from '@/app/schemas/RegisterSchema';
import { AuthService } from '@/app/services/AuthService';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export class RegisterUserController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  public store = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const validatedPayload = RegisterSchema.parse(req.body);

      await this._authService.register(validatedPayload);

      const response: ApiResponseDTO = {
        message:
          'User registered successfully, please check your email to confirm you account',
        status: 'success',
      };
      res.status(200).json(response);
    }
  );
}
