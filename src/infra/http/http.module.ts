import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { CreateAuthenticateUseCase } from '@/use-cases/authenticate/create-authenticate.use-case';
import { CreateCropUseCase } from '@/use-cases/crop/create-crop.use-case';
import { DeleteCropUseCase } from '@/use-cases/crop/delete-crop-use-case';
import { GetAllCropsUseCase } from '@/use-cases/crop/get-all-crops.use-case';
import { GetCropByIdUseCase } from '@/use-cases/crop/get-crop-by-id.use-case';
import { CreateDashBoardUseCase } from '@/use-cases/dashboard/create-dashboard.use-case';
import { CreateFarmUseCase } from '@/use-cases/farm/create-farm.use-case';
import { DeleteFarmUseCase } from '@/use-cases/farm/delete-farm-use-case';
import { GetAllFarmsUseCase } from '@/use-cases/farm/get-all-farms.use-case';
import { GetFarmByIdUseCase } from '@/use-cases/farm/get-farm-by-id.use-case';
import { CreateHarvestsUseCase } from '@/use-cases/harvests/create-harvests.use-case';
import { DeleteHarvestsUseCase } from '@/use-cases/harvests/delete-harvests-use-case';
import { GetAllHarvestsUseCase } from '@/use-cases/harvests/get-all-harvests.use-case';
import { GetHarvestsByIdUseCase } from '@/use-cases/harvests/get-harvests-by-id.use-case';
import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case';

import { AuthModule } from '../auth/auth.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { EnvModule } from '../env/env.module';
import { HealthController } from './controllers/@health/health.controller';
import { CreateAuthenticateController } from './controllers/authenticate/create-authenticate.controller';
import { CreateCropController } from './controllers/crops/create-crop.controller';
import { DeleteCropController } from './controllers/crops/delete-harvests.controller';
import { GetAllCropsController } from './controllers/crops/get-all-crops.controller';
import { GetCropByIdController } from './controllers/crops/get-crop-by-id.controller';
import { CreateDashBoardController } from './controllers/dashboard/create-dashboard.controller';
import { CreateFarmController } from './controllers/farm/create-farm.controller';
import { DeleteFarmController } from './controllers/farm/delete-farm.controller';
import { GetAllFarmsController } from './controllers/farm/get-all-farms.controller';
import { GetFarmByIdController } from './controllers/farm/get-farm-by-id.controller';
import { CreateHarvestsController } from './controllers/harvests/create-harvests.controller';
import { DeleteHarvetsController } from './controllers/harvests/delete-harvests.controller';
import { GetAllHarvestsController } from './controllers/harvests/get-all-harvests.controller';
import { GetHarvestsByIdController } from './controllers/harvests/get-harvests-by-id.controller';
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
    HealthController,
    CreateUserController,
    CreateAuthenticateController,
    CreateFarmController,
    GetAllFarmsController,
    GetFarmByIdController,
    DeleteFarmController,
    CreateHarvestsController,
    GetAllHarvestsController,
    GetHarvestsByIdController,
    CreateCropController,
    GetAllCropsController,
    GetCropByIdController,
    DeleteCropController,
    CreateDashBoardController,
    DeleteHarvetsController,
  ],
  providers: [
    CreateUserUseCase,
    CreateFarmUseCase,
    GetAllFarmsUseCase,
    GetFarmByIdUseCase,
    DeleteFarmUseCase,
    CreateHarvestsUseCase,
    GetAllHarvestsUseCase,
    GetHarvestsByIdUseCase,
    DeleteHarvestsUseCase,
    CreateCropUseCase,
    GetAllCropsUseCase,
    GetCropByIdUseCase,
    DeleteCropUseCase,
    CreateDashBoardUseCase,
    CreateAuthenticateUseCase,
  ],
})
export class HttpModule {}
