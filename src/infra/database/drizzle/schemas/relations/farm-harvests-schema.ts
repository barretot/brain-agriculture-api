import { text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { farms, harvests } from '../tables';

export const farmHarvests /* Safras + Fazenda */ = pgTable('farm_harvests', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  farmId: text('farm_id')
    .notNull()
    .references(() => farms.id),
  harvestsId: text('harvests_id')
    .notNull()
    .references(() => harvests.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
