import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from '@packages/shared/design/struct';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let code = HttpStatus.INTERNAL_SERVER_ERROR, msg = '';

    if (exception instanceof HttpException) {
      code = exception.getStatus();
      msg = exception.message;
    }

    if (code === 404) msg = 'Not Found';

    response.status(code).json(Response.build(undefined, {
      code,
      msg,
    }));
  }
}
