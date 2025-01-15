import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EncrypterAdapter } from '@/core/adapters/auth/encrypter-adapter';

@Injectable()
export class JwtEncrypter implements EncrypterAdapter {
  constructor(private jwtService: JwtService) {}

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
