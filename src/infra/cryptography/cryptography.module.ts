import { Module } from '@nestjs/common';

import { CryptographyAdapter } from '@/core/adapters/cryptography/cryptography-adapter';

import { Argon2Hasher } from './argon2/argon2-crypto.service';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [EnvModule],
  providers: [{ provide: CryptographyAdapter, useClass: Argon2Hasher }],
  exports: [CryptographyAdapter],
})
export class CryptographyModule {}
