import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { Harvests } from '@/core/domain/entities/Harvests';
import { HarvestsRepository } from '@/core/domain/repositories/harvests/HarvestsRepository';

import { DrizzleService } from '../../drizzle.service';
import { farmHarvests, farmOwner, farms, harvests } from '../../schemas';

@Injectable()
export class DrizzleHarvestsRepository implements HarvestsRepository {
  constructor(private drizzleService: DrizzleService) {}

  private getFarmByLoggedUser = async (userId: string, farmId) => {
    const result = await this.drizzleService.db
      .select({ farmId: farms.id })
      .from(farmOwner)
      .innerJoin(farms, eq(farmOwner.farmId, farms.id))
      .where(and(eq(farmOwner.userId, userId), eq(farmOwner.farmId, farmId)))
      .limit(1);

    return result;
  };
  async getById(userId: string, harvestId: string): Promise<Harvests | null> {
    const result = await this.drizzleService.db
      .select({
        farmId: farmHarvests.farmId,
        harvestId: harvests.id,
        year: harvests.year,
      })
      .from(farmOwner)
      .innerJoin(farms, eq(farmOwner.farmId, farms.id))
      .innerJoin(farmHarvests, eq(farms.id, farmHarvests.farmId))
      .innerJoin(harvests, eq(farmHarvests.harvestsId, harvests.id))
      .where(and(eq(farmOwner.userId, userId), eq(harvests.id, harvestId)))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  }

  async getAll(userId: string): Promise<Harvests[]> {
    const result = await this.drizzleService.db
      .select({
        farmId: farms.id,
        name: farms.name,
        city: farms.city,
        state: farms.state,
        totalArea: farms.totalArea,
        arableArea: farms.arableArea,
        vegetationArea: farms.vegetationArea,
        harvestId: harvests.id,
        year: harvests.year,
      })
      .from(farmOwner)
      .innerJoin(farms, eq(farmOwner.farmId, farms.id))
      .innerJoin(farmHarvests, eq(farms.id, farmHarvests.farmId))
      .innerJoin(harvests, eq(farmHarvests.harvestsId, harvests.id))
      .where(eq(farmOwner.userId, userId));

    const farmsMap = new Map<string, any>();

    result.forEach((row) => {
      const farmId = row.farmId;

      if (!farmsMap.has(farmId)) {
        farmsMap.set(farmId, {
          id: row.farmId,
          name: row.name,
          city: row.city,
          state: row.state,
          totalArea: row.totalArea,
          arableArea: row.arableArea,
          vegetationArea: row.vegetationArea,
          harvests: [],
        });
      }

      farmsMap.get(farmId).harvests.push({
        id: row.harvestId,
        year: row.year,
      });
    });

    return Array.from(farmsMap.values());
  }

  async create(
    userId,
    farmId: string,
    { year, id }: Harvests,
  ): Promise<null | void> {
    const result = await this.getFarmByLoggedUser(userId, farmId);

    if (result.length === 0) {
      return null;
    }

    await this.drizzleService.db.insert(harvests).values({
      id,
      year,
    });

    await this.drizzleService.db.insert(farmHarvests).values({
      farmId: String(result[0].farmId),
      harvestsId: String(id),
    });
  }

  async delete(userId: string, harvestId: string): Promise<null | void> {
    const result = await this.drizzleService.db
      .select()
      .from(farmHarvests)
      .innerJoin(farms, eq(farmHarvests.farmId, farms.id))
      .innerJoin(farmOwner, eq(farms.id, farmOwner.farmId))
      .where(
        and(
          eq(farmHarvests.harvestsId, harvestId),
          eq(farmOwner.userId, userId),
        ),
      );

    if (result.length === 0) {
      return null;
    }

    await this.drizzleService.db
      .delete(farmHarvests)
      .where(eq(farmHarvests.harvestsId, harvestId));

    await this.drizzleService.db
      .delete(harvests)
      .where(eq(harvests.id, harvestId));
  }
}
