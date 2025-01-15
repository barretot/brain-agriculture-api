import { text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { crops, harvests } from '../tables';

export const harvestsCrop /* Safra + Culturas Plantadas  */ = pgTable(
  'harvests_crops',
  {
    id: text('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    harvestsId: text('harvests_id')
      .notNull()
      .references(() => harvests.id),
    cropId: text('crop_id')
      .notNull()
      .references(() => crops.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
);
