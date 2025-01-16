import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';

import { DashBoardRepository } from '@/core/domain/repositories/dashboard/DashBoardRepository';

import { DrizzleService } from '../../drizzle.service';
import { crops, farms } from '../../schemas';

@Injectable()
export class DrizzleDashBoardRepository implements DashBoardRepository {
  constructor(private drizzleService: DrizzleService) {}

  async createDashBoard(): Promise<Record<string, any>> {
    const db = this.drizzleService.db;

    const totalFarms = await db.select({ count: sql`COUNT(*)` }).from(farms);

    const totalHectares = await db
      .select({ totalArea: sql`SUM(${farms.totalArea})` })
      .from(farms);

    const farmsByState = await db
      .select({
        state: farms.state,
        count: sql`COUNT(*)`,
      })
      .from(farms)
      .groupBy(farms.state);

    const cropsByType = await db
      .select({
        cropName: crops.cropName,
        totalArea: sql`SUM(${crops.area})`,
      })
      .from(crops)
      .groupBy(crops.cropName);

    const landUsage = await db
      .select({
        totalArableArea: sql`SUM(${farms.arableArea})`,
        totalVegetationArea: sql`SUM(${farms.vegetationArea})`,
      })
      .from(farms);

    return {
      totalFarms: totalFarms[0]?.count || 0,
      totalHectares: totalHectares[0]?.totalArea || 0,
      farmsByState,
      cropsByType,
      landUsage,
    };
  }
}
