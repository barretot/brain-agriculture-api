import { Injectable } from '@nestjs/common';

import { Farm } from '@/core/domain/entities/Farm';
import { FarmRepository } from '@/core/domain/repositories/farm/FarmRepository';

@Injectable()
export class InMemoryFarmRepository implements FarmRepository {
  public items: { farm: Farm; userId: string }[] = [];

  constructor() {}

  async getAll(userId: string): Promise<Farm[]> {
    return this.items
      .filter((item) => item.userId === userId)
      .map((item) => item.farm);
  }

  async getById(userId: string, farmId: string): Promise<Farm | null> {
    const item = this.items.find(
      (entry) => entry.userId === userId && entry.farm.id === farmId,
    );

    return item ? item.farm : null;
  }

  async delete(userId: string, farmId: string): Promise<null | void> {
    const index = this.items.findIndex(
      (entry) => entry.userId === userId && entry.farm.id === farmId,
    );

    if (index === -1) {
      return null;
    }

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  async create(userId: string, farm: Farm): Promise<void> {
    this.items.push({ userId, farm });
  }
}
