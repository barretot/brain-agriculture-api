import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { CreateAuthenticateUseCase } from '@/use-cases/authenticate/create-authenticate.use-case';
import { CreateFarmUseCase } from '@/use-cases/farm/create-farm.use-case';
import { GetAllFarsmUseCase } from '@/use-cases/farm/get-all-farms.use-case';
import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case';

import { AuthModule } from '../auth/auth.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { EnvModule } from '../env/env.module';
import { HealthController } from './controllers/@health/health.controller';
import { CreateAuthenticateController } from './controllers/authenticate/create-authenticate.controller';
import { CreateFarmController } from './controllers/farm/create-farm.controller';
import { GetAllFarmController } from './controllers/farm/get-all-farms.controller';
import { CreateUserController } from './controllers/user/create-user.controller';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    CryptographyModule,
    CryptographyModule,
    TerminusModule,
    AxiosHttpModule,
    EnvModule,
  ],
  controllers: [
    CreateUserController,
    CreateFarmController,
    GetAllFarmController,
    CreateAuthenticateController,
    HealthController,
  ],
  providers: [
    CreateUserUseCase,
    CreateFarmUseCase,
    GetAllFarsmUseCase,
    CreateAuthenticateUseCase,
  ],
})
export class HttpModule {}
