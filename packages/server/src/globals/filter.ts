import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseBuilder } from '@packages/shared/design/types/response';
import { Response } from 'express';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    let code = HttpStatus.INTERNAL_SERVER_ERROR, msg = '';

    console.warn(exception);

    if (exception instanceof HttpException) {
      code = exception.getStatus();
      msg = exception.message;
    } else {
      msg = (<Error>exception)?.message;
    }

    this.concreteHandler(response, code, msg);
  }

  concreteHandler(response: Response, code: HttpStatus, msg: string): void {

    if (code === 404) msg = 'Not Found';

    response
      .status(code)
      .json(ResponseBuilder.create(undefined, {
        code,
        msg,
      }));
  }
}
