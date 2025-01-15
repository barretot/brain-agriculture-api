import { Module } from '@nestjs/common';

import { UserRepository } from '@/core/domain/repositories/user/UserRepository';

import { InMemoryDatabaseService } from './in-memory/in-memory-database.service';
import { InMemoryUserRepository } from './in-memory/repositories/user/user-repository';

@Module({
  providers: [
    InMemoryDatabaseService,
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [InMemoryDatabaseService, UserRepository],
})
export class DatabaseModule {}
