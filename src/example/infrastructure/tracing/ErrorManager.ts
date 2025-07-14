import { Exception } from "../../domain/exception/Exception";

export class ErrorManager {
  wrap(fn: (...args: any[]) => Promise<any>) {
    return async (...args: any[]) => {
      try {
        return await fn(...args);
      } catch (error: any) {
        return this.handle(error);
      }
    };
  }

  handle(error: Error): { statusCode: number; message: string } {
    let statusCode = 500;
    let message = "Internal server error";

    if (error instanceof Exception) {
      statusCode = error.statusCode;
      message = error.message;
    }

    console.error(error);

    return {
      statusCode,
      message,
    };
  }
}
