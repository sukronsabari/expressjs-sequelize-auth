import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';

export async function ValidationErrorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ApiResponseDTO> | any> {
  if (err instanceof ZodError) {
    const errorResponse = {
      status: 'failed',
      message: req.t('validation.default_message'),
      errors: {} as Record<string, string[]>,
    };

    err.errors.forEach((error: any) => {
      const params: { [key: string]: string | number | boolean } = {};
      const path = error.path.join('.');

      // Memasukkan nilai `minimum`, `maximum`, dan `exact` jika ada
      if (error.minimum !== undefined) {
        params.min = error.minimum;
      }
      if (error.maximum !== undefined) {
        params.max = error.maximum;
      }
      if (error.exact !== undefined) {
        params.exact = error.exact;
      }

      // Mendapatkan pesan error terjemahan dari i18n dengan interpolasi
      const message = req.t(`validation.${error.message}`, params);

      if (!errorResponse.errors[path]) {
        errorResponse.errors[path] = [];
      }
      errorResponse.errors[path].push(message);
    });

    return res.status(422).json(errorResponse);
  }

  return next(err);
}
