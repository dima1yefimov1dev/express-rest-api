import { Errors } from "../types/types";

class ApiError extends Error {
  status: number;
  errors: [];

  constructor(status: number, message: string, errors?) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, Errors.Unauthorized);
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  };
}

export default  ApiError;