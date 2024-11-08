import { BaseError } from './BaseError';

export class TooManyRequestError extends BaseError {
  constructor(message: string) {
    super(message, 429);
    Object.setPrototypeOf(this, TooManyRequestError.prototype);
  }
}
