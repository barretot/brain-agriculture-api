import { Controller, Get, Req } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { Request } from 'express';

@Controller('healthcheck')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(@Req() request: Request) {
    const host = request.headers.host;
    return this.health.check([
      () => this.http.pingCheck('health-check-api', `http://${host}`),
    ]);
  }
}
