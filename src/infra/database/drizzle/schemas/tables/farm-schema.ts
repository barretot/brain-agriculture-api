import { text, timestamp, pgTable, doublePrecision } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

export const farms = pgTable('farm', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  totalArea: doublePrecision('total_area').notNull(),
  arableArea: doublePrecision('arable_area').notNull(),
  vegetationArea: doublePrecision('vegetation_area').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
