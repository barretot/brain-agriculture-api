import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { User } from '@/core/domain/entities/User';
import { UserRepository } from '@/core/domain/repositories/user/UserRepository';

import { DrizzleService } from '../../drizzle.service';
import { users } from '../../schemas';

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(private drizzleService: DrizzleService) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return result[0] as User;
  }
  async findByCpfCnpj(cpfCnpj: string): Promise<User | null> {
    const result = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.cpfCnpj, cpfCnpj))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return result[0] as User;
  }

  async create(props: User): Promise<void> {
    await this.drizzleService.db.insert(users).values(props);
  }
}
