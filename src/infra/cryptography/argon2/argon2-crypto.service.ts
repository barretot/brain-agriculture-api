import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

import { CryptographyAdapter } from '@/core/adapters/cryptography/cryptography-adapter';
import { EnvService } from '@/infra/env/env.service';

@Injectable()
export class Argon2Hasher implements CryptographyAdapter {
  constructor(private configService: EnvService) {}
  async hash(password: string): Promise<string> {
    const passwordHash = argon2.hash(password, {
      type: this.configService.get('ARGON2_TYPE'),
      timeCost: this.configService.get('ARGON2_TIME_COST'),
    });

    return passwordHash;
  }

  async compare(dbPassword: string, loginPassword: string): Promise<boolean> {
    return argon2.verify(dbPassword, loginPassword);
  }
}
