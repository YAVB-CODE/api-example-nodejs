import { Exception } from "./Exception";

export class NotFoundException extends Exception {
  constructor(message: string = "Not found") {
    super(message, 404);
  }
}
