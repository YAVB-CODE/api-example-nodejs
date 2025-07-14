export class Exception extends Error {
  public statusCode: number;

  constructor(message: string = "Internal server error", statusCode: number = 500) {
    super(message);
    this.name = "Exception";
    this.statusCode = statusCode;
  }
}
