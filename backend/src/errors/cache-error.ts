import { CustomError } from "./custom-error";



export class CacheError extends CustomError{
  statusCode = 500;

  constructor(message = "Cache Error"){
    super(message)

    this.message = message

    Object.setPrototypeOf(this, CacheError.prototype)
  }

  serializeError() {
    return {
      message: this.message
    }
  }
}