import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const response = exception.getResponse();
    const errorDetails =
      typeof response === 'string'
        ? { message: response }
        : (response as object);

    const errorResponse = {
      statusCode: status,
      path: request.url,
      ...errorDetails,
    };

    reply.status(status).send(errorResponse);
  }
}
