import { Module } from '@nestjs/common';

import { CropsRepository } from '@/core/domain/repositories/crops/CropsRepository';
import { DashBoardRepository } from '@/core/domain/repositories/dashboard/DashBoardRepository';
import { FarmRepository } from '@/core/domain/repositories/farm/FarmRepository';
import { HarvestsRepository } from '@/core/domain/repositories/harvests/HarvestsRepository';
import { UserRepository } from '@/core/domain/repositories/user/UserRepository';

import { DrizzleService } from './drizzle/drizzle.service';
import { EnvModule } from '../env/env.module';
import { DrizzleCropsRepository } from './drizzle/repositories/crop/crops-repository';
import { DrizzleDashBoardRepository } from './drizzle/repositories/dashboard/dashboard-repository';
import { DrizzleFarmRepository } from './drizzle/repositories/farm/farm-repository';
import { DrizzleHarvestsRepository } from './drizzle/repositories/harvests/harvests-repository';
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
    {
      provide: HarvestsRepository,
      useClass: DrizzleHarvestsRepository,
    },
    {
      provide: CropsRepository,
      useClass: DrizzleCropsRepository,
    },
    {
      provide: DashBoardRepository,
      useClass: DrizzleDashBoardRepository,
    },
  ],
  exports: [
    DrizzleService,
    UserRepository,
    FarmRepository,
    HarvestsRepository,
    CropsRepository,
    DashBoardRepository,
  ],
})
export class DatabaseModule {}
