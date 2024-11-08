import { BaseError } from './BaseError';

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, 403);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
