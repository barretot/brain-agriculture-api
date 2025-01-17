import { Injectable } from '@nestjs/common';

import { User } from '@/core/domain/entities/User';
import { UserRepository } from '@/core/domain/repositories/user/UserRepository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  constructor() {}
  async findByCpfCnpj(cpfCnpj: string): Promise<User | null> {
    const user = this.items.find((item) => item.cpfCnpj === cpfCnpj);

    if (!user) {
      return null;
    }

    return user;
  }
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
  async create(user: User) {
    this.items.push(user);
  }
}
