import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import 'dotenv/config';

import {
  crops,
  farmHarvests,
  farmOwner,
  farms,
  harvests,
  harvestsCrop,
  users, // Importa a tabela de usuários
} from './infra/database/drizzle/schemas';

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

  const db = drizzle(pool);

  try {
    console.log('Starting seed process...');

    await db.delete(harvestsCrop).execute();
    await db.delete(farmHarvests).execute();
    await db.delete(farmOwner).execute();
    await db.delete(harvests).execute();
    await db.delete(crops).execute();
    await db.delete(farms).execute();
    await db.delete(users).execute();

    const hashedPassword = await argon2.hash('password123');

    for (let i = 0; i < 8; i++) {
      const user1Id = randomUUID();
      const user2Id = randomUUID();

      await db.insert(users).values([
        {
          id: String(user1Id),
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          cpfCnpj: faker.string.numeric(11),
          password: hashedPassword,
          createdAt: faker.date.recent(),
        },
        {
          id: String(user2Id),
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          cpfCnpj: faker.string.numeric(11),
          password: hashedPassword,
          createdAt: faker.date.recent(),
        },
      ]);

      const farm1Id = randomUUID();
      const farm2Id = randomUUID();

      await db.insert(farms).values([
        {
          id: farm1Id,
          name: 'Fazenda Feliz',
          city: faker.location.city(),
          state: faker.location.state(),
          totalArea: 1000,
          arableArea: 800,
          vegetationArea: 200,
          createdAt: new Date(),
        },
        {
          id: farm2Id,
          name: 'Fazenda MG',
          city: faker.location.city(),
          state: faker.location.state(),
          totalArea: 1500,
          arableArea: 1000,
          vegetationArea: 500,
          createdAt: new Date(),
        },
      ]);

      // Criar usuários das fazendas
      const owner1Id = randomUUID();
      const owner2Id = randomUUID();

      await db.insert(farmOwner).values([
        { id: owner1Id, userId: user1Id, farmId: farm1Id },
        { id: owner2Id, userId: user2Id, farmId: farm2Id },
      ]);

      // Criar safras
      const harvest1Id = randomUUID();
      const harvest2Id = randomUUID();

      await db.insert(harvests).values([
        { id: harvest1Id, year: '2023' },
        { id: harvest2Id, year: '2024' },
      ]);

      // Associar fazendas a safras
      const farmHarvest1Id = randomUUID();
      const farmHarvest2Id = randomUUID();

      await db.insert(farmHarvests).values([
        { id: farmHarvest1Id, farmId: farm1Id, harvestsId: harvest1Id },
        { id: farmHarvest2Id, farmId: farm2Id, harvestsId: harvest2Id },
      ]);

      // Criar culturas
      const crop1Id = randomUUID();
      const crop2Id = randomUUID();

      const cropNames = [
        'Soja',
        'Milho',
        'Trigo',
        'Café',
        'Algodão',
        'Arroz',
        'Cana-de-açúcar',
        'Batata',
        'Tomate',
      ];

      await db.insert(crops).values([
        {
          id: crop1Id,
          cropName:
            cropNames[faker.number.int({ min: 0, max: cropNames.length - 1 })], // Nome aleatório da lista
          area: faker.number.float({ min: 50, max: 300 }),
        },
        {
          id: crop2Id,
          cropName:
            cropNames[faker.number.int({ min: 0, max: cropNames.length - 1 })], // Nome aleatório da lista
          area: faker.number.float({ min: 50, max: 300 }),
        },
      ]);

      // Associar safras a culturas
      const harvestCrop1Id = randomUUID();
      const harvestCrop2Id = randomUUID();

      await db.insert(harvestsCrop).values([
        { id: harvestCrop1Id, harvestsId: harvest1Id, cropId: crop1Id },
        { id: harvestCrop2Id, harvestsId: harvest2Id, cropId: crop2Id },
      ]);

      console.log('Seeding completed successfully!');
    }
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await pool.end();
  }
}

seed();
