import { Injectable } from '@nestjs/common';

import { Harvests } from '@/core/domain/entities/Harvests';
import { HarvestsRepository } from '@/core/domain/repositories/harvests/HarvestsRepository';

@Injectable()
export class InMemoryHarvestsRepository implements HarvestsRepository {
  public items: { userId: string; harvests: Harvests }[] = [];

  constructor() {}

  async getAll(): Promise<any[]> {
    return [
      {
        id: '8d7033d8-f65b-468e-82b4-cf7d727eb352',
        name: 'Fazenda Família Doe',
        city: 'Minas Gerais',
        state: 'MG',
        totalArea: 1000,
        arableArea: 600,
        vegetationArea: 400,
        harvests: [
          {
            id: '610db7bf-ec40-43bb-9797-102d59b96ed5',
            year: '2010',
          },
        ],
      },
    ];
  }

  async getById(userId: string, harvestId: string): Promise<Harvests | null> {
    const item = this.items.find(
      (entry) => entry.userId === userId && entry.harvests.id === harvestId,
    );

    return item ? item.harvests : null;
  }

  async create(): Promise<null | void> {
    vi.fn(async () => true);
  }

  async delete(): Promise<null | void> {
    vi.fn(async () => true);
  }
}
