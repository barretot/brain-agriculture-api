import { text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  cpfCnpj: text('cpf_cnpj').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
