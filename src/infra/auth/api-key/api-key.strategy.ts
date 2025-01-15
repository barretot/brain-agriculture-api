import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { EnvService } from '@/infra/env/env.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private config: EnvService) {
    super(
      { header: 'x-api-key', prefix: '' },
      true,
      async (apiKey: string, done: (error: unknown, data: unknown) => void) => {
        if (this.validateAPIKey(apiKey)) {
          done(null, true);
        }

        done(new UnauthorizedException('Invalid API Key'), null);
      },
    );
  }

  validateAPIKey(apiKey: string): boolean {
    const API_KEY = this.config.get('API_KEY');

    return API_KEY === apiKey;
  }
}
