import { text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { farms, users } from '../tables';

export const farmOwner = pgTable('farm_owner', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  farmId: text('farm_id').references(() => farms.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
