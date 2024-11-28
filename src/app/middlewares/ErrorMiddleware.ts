import multer from 'multer';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';
import { BaseError } from '@/app/exceptions/BaseError';

export async function errorMiddleware(err: any, _req: Request, res: Response, next: NextFunction): Promise<Response<ApiResponseDTO> | any> {
  try {
    const responseError: ApiResponseDTO = {
      status: 'failed',
      message: '',
    };

    console.log('CALLED', err);

    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        ...responseError,
        message: err.message || 'An error occurred while uploading the file',
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        ...responseError,
        message: 'Invalid or expired token',
      });
    }

    if (err instanceof BaseError) {
      return res.status(err.statusCode).json({
        ...responseError,
        message: err.message,
      });
    }

    return res.status(500).json({
      ...responseError,
      message: 'Internal Server Error',
    });
  } catch (error) {
    next(error);
  }
}
