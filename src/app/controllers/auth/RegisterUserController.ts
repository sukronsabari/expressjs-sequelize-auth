import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AuthService } from '@/app/services/AuthService';
import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';
import { registerSchema } from '@/app/schemas/RegisterSchema';

export class RegisterUserController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  public store = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    res.status(200).json({});

    // const validatedPayload = registerSchema.parse(req.body);

    // await this._authService.register(validatedPayload);

    // const response: ApiResponseDTO = {
    //   message: 'User registered successfully, please check your email to confirm you account',
    //   status: 'success',
    // };
    // res.status(200).json(response);
  });
}
