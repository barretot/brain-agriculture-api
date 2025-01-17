import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/infra/app.module';
import { DrizzleService } from '@/infra/database/drizzle/drizzle.service';

interface MockDependencies {
  app: INestApplication;
  drizzle: DrizzleService;
}

export class UserE2EBuilder {
  private mockDependencies: Partial<MockDependencies>;

  constructor() {
    this.mockDependencies = {};
  }

  public async success(): Promise<UserE2EBuilder> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    const drizzle = moduleRef.get(DrizzleService);

    await app.init();

    this.mockDependencies = { app, drizzle };

    return this;
  }

  public build(): MockDependencies {
    return this.mockDependencies as MockDependencies;
  }
}
