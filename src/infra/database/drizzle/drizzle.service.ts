import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { EnvService } from '@/infra/env/env.service';

import * as schema from './schemas';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger();
  readonly pool: Pool;
  public readonly db: NodePgDatabase<typeof schema>;

  constructor(private readonly configService: EnvService) {
    this.pool = new Pool({
      connectionString: this.configService.get('DATABASE_URL'),
      max: 10,
    });

    this.db = drizzle(this.pool, { schema });
  }

  async onModuleInit() {
    try {
      await this.pool.connect();
      this.logger.log('Database connected successfully');
    } catch (error) {
      this.logger.error('Error connecting to the database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.pool.end();
      this.logger.log('Database connection closed');
    } catch (error) {
      this.logger.log('Error disconnecting from the database:', error);
    }
  }
}
