import { Module } from '@nestjs/common';

import { FarmRepository } from '@/core/domain/repositories/farm/FarmRepository';
import { UserRepository } from '@/core/domain/repositories/user/UserRepository';

import { DrizzleService } from './drizzle/drizzle.service';
import { EnvModule } from '../env/env.module';
import { DrizzleFarmRepository } from './drizzle/repositories/farm/farm-repository';
import { DrizzleUserRepository } from './drizzle/repositories/user/user-repository';

@Module({
  imports: [EnvModule],
  providers: [
    DrizzleService,

    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    {
      provide: FarmRepository,
      useClass: DrizzleFarmRepository,
    },
  ],
  exports: [DrizzleService, UserRepository, FarmRepository],
})
export class DatabaseModule {}
