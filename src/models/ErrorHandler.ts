class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  error: any;
  constructor(statusCode: number, message: string, error?: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

export default ErrorHandler;
