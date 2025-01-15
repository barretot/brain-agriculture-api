import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case';

import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { EnvModule } from '../env/env.module';
import { HealthController } from './controllers/health/health.controller';
import { CreateUserController } from './controllers/user/create-user.controller';

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    CryptographyModule,
    TerminusModule,
    AxiosHttpModule,
    EnvModule,
  ],
  controllers: [CreateUserController, HealthController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
