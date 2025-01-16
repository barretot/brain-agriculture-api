import { text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

export const harvests /* safras */ = pgTable('harvests', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  year: text('year').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
