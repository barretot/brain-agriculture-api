import { randomUUID } from 'crypto'; // Gerador de UUID nativo do Node.js

import { DrizzleService } from '../drizzle.service';
import {
  crops,
  farmHarvests,
  farmOwner,
  farms,
  harvests,
  harvestsCrop,
} from '../schemas';

export class SeedDataBase {
  constructor(private drizzleService: DrizzleService) {}

  async seed() {
    try {
      console.log('Starting seed process...');

      const db = this.drizzleService.db;

      // Limpar tabelas
      await db.delete(harvestsCrop).execute();
      await db.delete(farmHarvests).execute();
      await db.delete(farmOwner).execute();
      await db.delete(harvests).execute();
      await db.delete(crops).execute();
      await db.delete(farms).execute();

      // Criar fazendas
      const farm1Id = randomUUID();
      const farm2Id = randomUUID();

      await db.insert(farms).values([
        {
          id: farm1Id,
          name: 'Fazenda Exemplo',
          city: 'Cidade Exemplo',
          state: 'EX',
          totalArea: 1000,
          arableArea: 800,
          vegetationArea: 200,
          createdAt: new Date(),
        },
        {
          id: farm2Id,
          name: 'Fazenda Modelo',
          city: 'Cidade Modelo',
          state: 'MO',
          totalArea: 1500,
          arableArea: 1000,
          vegetationArea: 500,
          createdAt: new Date(),
        },
      ]);

      const owner1Id = randomUUID();
      const owner2Id = randomUUID();

      await db.insert(farmOwner).values([
        { id: owner1Id, userId: randomUUID(), farmId: farm1Id },
        { id: owner2Id, userId: randomUUID(), farmId: farm2Id },
      ]);

      const harvest1Id = randomUUID();
      const harvest2Id = randomUUID();

      await db.insert(harvests).values([
        { id: harvest1Id, year: String(2023) },
        { id: harvest2Id, year: String(2024) },
      ]);

      const farmHarvest1Id = randomUUID();
      const farmHarvest2Id = randomUUID();

      await db.insert(farmHarvests).values([
        { id: farmHarvest1Id, farmId: farm1Id, harvestsId: harvest1Id },
        { id: farmHarvest2Id, farmId: farm2Id, harvestsId: harvest2Id },
      ]);

      const crop1Id = randomUUID();
      const crop2Id = randomUUID();

      await db.insert(crops).values([
        { id: crop1Id, cropName: 'Soja', area: 100.5 },
        { id: crop2Id, cropName: 'Milho', area: 200.0 },
      ]);

      const harvestCrop1Id = randomUUID();
      const harvestCrop2Id = randomUUID();

      await db.insert(harvestsCrop).values([
        { id: harvestCrop1Id, harvestsId: harvest1Id, cropId: crop1Id },
        { id: harvestCrop2Id, harvestsId: harvest2Id, cropId: crop2Id },
      ]);

      console.log('Seeding completed!');
    } catch (err) {
      console.error('Seeding failed:', err);
    } finally {
      this.drizzleService.pool.end();
    }
  }
}
