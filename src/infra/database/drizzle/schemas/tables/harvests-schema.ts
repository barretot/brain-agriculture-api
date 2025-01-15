import { text, timestamp, pgTable, date } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

export const harvests /* safras */ = pgTable('harvests', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  year: date('date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
