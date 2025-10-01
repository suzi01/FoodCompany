export class HttpError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  cause?: Error | undefined;

  constructor(statusCode: number, message: string, cause?: Error) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.cause = cause;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}
