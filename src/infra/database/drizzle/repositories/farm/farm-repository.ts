import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { Farm } from '@/core/domain/entities/Farm';
import { FarmRepository } from '@/core/domain/repositories/farm/FarmRepository';

import { DrizzleService } from '../../drizzle.service';
import { farmOwner, farms } from '../../schemas';

@Injectable()
export class DrizzleFarmRepository implements FarmRepository {
  constructor(private drizzleService: DrizzleService) {}
  async getAll(userId: string): Promise<Farm[]> {
    const result = await this.drizzleService.db
      .select({
        id: farms.id,
        name: farms.name,
        city: farms.city,
        state: farms.state,
        totalArea: farms.totalArea,
        arableArea: farms.arableArea,
        vegetationArea: farms.vegetationArea,
      })
      .from(farmOwner)
      .innerJoin(farms, eq(farmOwner.farmId, farms.id))
      .where(eq(farmOwner.userId, userId));

    return result;
  }

  async getById(userId: string, farmId: string): Promise<Farm | null> {
    const result = await this.drizzleService.db
      .select({
        id: farms.id,
        name: farms.name,
        city: farms.city,
        state: farms.state,
        totalArea: farms.totalArea,
        arableArea: farms.arableArea,
        vegetationArea: farms.vegetationArea,
      })
      .from(farmOwner)
      .innerJoin(farms, eq(farmOwner.farmId, farms.id))
      .where(and(eq(farmOwner.userId, userId), eq(farmOwner.farmId, farmId)))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  }

  async create(userId: string, props: Farm): Promise<void> {
    await this.drizzleService.db.insert(farms).values(props);

    await this.drizzleService.db.insert(farmOwner).values({
      userId: userId as string,
      farmId: props.id,
    });
  }
  async delete(farmId: string): Promise<void> {
    await this.drizzleService.db.delete(farms).where(eq(farms.id, farmId));

    await this.drizzleService.db
      .delete(farmOwner)
      .where(eq(farmOwner.farmId, farmId));
  }
}
