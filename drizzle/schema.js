import { int, mysqlTable, serial, time, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: serial().primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({length:255}).notNull(),
  createdAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at').defaultNow().onUpdateNow().notNull()
});
