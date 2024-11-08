import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
