import { Injectable } from '@nestjs/common';

import { Crop } from '@/core/domain/entities/Crop';
import { CropsRepository } from '@/core/domain/repositories/crops/CropsRepository';

@Injectable()
export class InMemoryCropsRepository implements CropsRepository {
  public items: { userId: string; harvestsId: string; harvests: Crop }[] = [];

  constructor() {}
  async getAll(): Promise<any[]> {
    return [
      {
        id: '9739cb43-e078-4085-b7a9-1700dadeec4d',
        name: 'Fazenda Família Doe',
        harvests: [
          {
            id: '02a2b891-593c-4d47-bcc6-4a56fb756a8f',
            year: '2023',
            crops: [
              {
                id: '056adfde-ca97-4e49-be88-54686d159357',
                name: 'Soja',
                area: 1000,
              },
              {
                id: '7c3e667c-9a03-45aa-b32a-af082458317b',
                name: 'Café',
                area: 2000,
              },
            ],
          },
        ],
      },
    ];
  }
  async getById(): Promise<Record<string, unknown> | null> {
    return {};
  }
  async create(): Promise<null | Record<string, any>> {
    return {};
  }
  async delete(): Promise<null | void> {
    vi.fn(async () => true);
  }
}
