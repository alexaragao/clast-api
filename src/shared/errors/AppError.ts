class AppError{
  public readonly maessage: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.maessage = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
