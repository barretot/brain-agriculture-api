import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    Logger.log(
      `send request... ${JSON.stringify(request.body)} | [${request.method}] ${
        request.url
      } - ${now}ms`,
    );

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        Logger.log(
          `response...  statusCode ==> [${response.statusCode}] | [${
            request.method
          }] ${request.url} - ${Date.now() - now}ms`,
        );
      }),
      catchError((err) => {
        Logger.error(
          `response error... ${JSON.stringify(
            err?.response || 'Something went wrong',
          )} | [${request.method}] ${request.url} - ${Date.now() - now}ms`,
        );

        if (err instanceof BadRequestException) {
          return throwError(() => err);
        } else if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }

        return throwError(() => err);
      }),
    );
  }
}
