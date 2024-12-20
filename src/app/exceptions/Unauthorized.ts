import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
