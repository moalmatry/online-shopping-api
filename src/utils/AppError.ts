class AppError extends Error {
  /** if the status code is 400 will be fail 500 will be error */
  public statusCode: number;
  /** if the status code is 400 will be fail 500 will be error */
  public status: 'fail' | 'error';
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
