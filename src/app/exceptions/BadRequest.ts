import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
