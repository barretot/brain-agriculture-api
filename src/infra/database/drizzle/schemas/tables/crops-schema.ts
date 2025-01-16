import { text, timestamp, pgTable, doublePrecision } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

export const crops = pgTable('crops', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  cropName: text('crop_name').notNull(),
  area: doublePrecision('area').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
