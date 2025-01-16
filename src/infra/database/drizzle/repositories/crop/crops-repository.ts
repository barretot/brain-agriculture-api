import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { Crop } from '@/core/domain/entities/Crop';
import { CropsRepository } from '@/core/domain/repositories/crops/CropsRepository';

import { DrizzleService } from '../../drizzle.service';
import {
  crops,
  farmHarvests,
  farmOwner,
  farms,
  harvests,
  harvestsCrop,
} from '../../schemas';

@Injectable()
export class DrizzleCropsRepository implements CropsRepository {
  constructor(private drizzleService: DrizzleService) {}
  async getAll(userId: string): Promise<Crop[]> {
    const result = await this.drizzleService.db
      .select({
        farmId: farms.id,
        farmName: farms.name,
        totalArea: farms.totalArea,
        arableArea: farms.arableArea,
        vegetationArea: farms.vegetationArea,
        harvestId: harvests.id,
        year: harvests.year,
        cropId: crops.id,
        cropName: crops.cropName,
        cropArea: crops.area,
      })
      .from(farmOwner)
      .innerJoin(farms, eq(farmOwner.farmId, farms.id))
      .innerJoin(farmHarvests, eq(farms.id, farmHarvests.farmId))
      .innerJoin(harvests, eq(farmHarvests.harvestsId, harvests.id))
      .innerJoin(harvestsCrop, eq(harvests.id, harvestsCrop.harvestsId))
      .innerJoin(crops, eq(harvestsCrop.cropId, crops.id))
      .where(eq(farmOwner.userId, userId));

    const farmsMap = new Map<string, any>();

    result.forEach((row) => {
      if (!farmsMap.has(row.farmId)) {
        farmsMap.set(row.farmId, {
          farm: {
            id: row.farmId,
            name: row.farmName,
            area: row.totalArea,
            arableArea: row.arableArea,
            vegetationArea: row.vegetationArea,
          },

          harvests: [],
        });
      }

      const farm = farmsMap.get(row.farmId);

      const harvest = farm.harvests.find((h: any) => h.id === row.harvestId);
      if (!harvest) {
        farm.harvests.push({
          id: row.harvestId,
          year: row.year,
          crops: [],
        });
      }

      const currentHarvest = farm.harvests.find(
        (h: any) => h.id === row.harvestId,
      );

      if (currentHarvest) {
        currentHarvest.crops.push({
          id: row.cropId,
          name: row.cropName,
          area: row.cropArea,
        });
      }
    });

    return Array.from(farmsMap.values());
  }

  async getById(
    userId: string,
    cropId: string,
  ): Promise<Record<string, unknown> | null> {
    const result = await this.drizzleService.db
      .select({
        farmId: farms.id,
        farmName: farms.name,
        cropId: crops.id,
        cropName: crops.cropName,
        area: crops.area,
        cropCreatedAt: crops.createdAt,
        harvestId: harvests.id,
        harvestYear: harvests.year,
      })
      .from(farmOwner)
      .innerJoin(farms, eq(farmOwner.farmId, farms.id))
      .innerJoin(farmHarvests, eq(farms.id, farmHarvests.farmId))
      .innerJoin(harvests, eq(farmHarvests.harvestsId, harvests.id))
      .innerJoin(harvestsCrop, eq(harvestsCrop.harvestsId, harvests.id))
      .innerJoin(crops, eq(harvestsCrop.cropId, crops.id))
      .where(and(eq(farmOwner.userId, userId), eq(crops.id, cropId)))
      .limit(1);

    if (result.length === 0) {
      return null;
    }
    const data = result[0];

    const structuredResult = {
      farm: {
        id: data.farmId,
        name: data.farmName,
        harvests: [
          {
            id: data.harvestId,
            year: data.harvestYear,
            crops: [
              {
                id: data.cropId,
                name: data.cropName,
                area: data.area,
                createdAt: data.cropCreatedAt,
              },
            ],
          },
        ],
      },
    };

    return structuredResult;
  }

  async delete(userId: string, cropId: string): Promise<null | void> {
    const result = await this.drizzleService.db
      .select()
      .from(farmOwner)
      .innerJoin(farms, eq(farmOwner.farmId, farms.id))
      .innerJoin(farmHarvests, eq(farms.id, farmHarvests.farmId))
      .innerJoin(harvests, eq(farmHarvests.harvestsId, harvests.id))
      .innerJoin(harvestsCrop, eq(harvestsCrop.harvestsId, harvests.id))
      .innerJoin(crops, eq(harvestsCrop.cropId, crops.id))
      .where(and(eq(farmOwner.userId, userId), eq(crops.id, cropId)))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    await this.drizzleService.db
      .delete(harvestsCrop)
      .where(eq(harvestsCrop.cropId, cropId));

    await this.drizzleService.db.delete(crops).where(eq(crops.id, cropId));
  }

  async create(
    userId: string,
    harvestId: string,
    props: Crop,
  ): Promise<null | Record<string, any>> {
    const result = await this.drizzleService.db
      .select()
      .from(farmOwner)
      .innerJoin(farms, eq(farmOwner.farmId, farms.id))
      .innerJoin(farmHarvests, eq(farms.id, farmHarvests.farmId))
      .where(
        and(
          eq(farmOwner.userId, userId),
          eq(farmHarvests.harvestsId, harvestId),
        ),
      );

    if (result.length === 0) {
      return null;
    }

    const { arableArea } = result.map((item) => item.farm)[0];

    if (props.area > arableArea) {
      return {
        ok: false,
        area: props.area,
        arableArea,
      };
    }

    await this.drizzleService.db.insert(crops).values({
      id: props.id,
      cropName: props.cropName,
      area: props.area,
      createdAt: new Date(),
    });

    await this.drizzleService.db.insert(harvestsCrop).values({
      cropId: String(props.id),
      harvestsId: String(harvestId),
    });

    return {
      ok: true,
    };
  }
}
