import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').unique().notNull(),
});

export const postsTable = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

export const organizationsTable = sqliteTable('organizations', {
  id: integer('id').primaryKey(),
  userId: text('user_id').notNull(),
  orgName: text('org_name').notNull(),
  orgSite: text('org_site').notNull(),
  orgEmail: text('org_email').notNull(),
  orgPhone: text('org_phone').notNull(),
  orgAddress: text('org_address').notNull(),
  orgCity: text('org_city').notNull(),
  orgState: text('org_state').notNull(),
  orgZip: text('org_zip').notNull(),
  orgCountry: text('org_country').notNull(),
  orgDescription: text('org_description').notNull(),
  orgLogo: text('org_logo').notNull(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

export const metricsTable = sqliteTable('metrics', {
  id: integer('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  carbonFootprint: integer('carbon_footprint').notNull(),
  waterUsage: integer('water_usage').notNull(),
  wasteReduction: integer('waste_reduction').notNull(),
  communityEngagement: integer('community_engagement').notNull(),
  energyConsumption: integer('energy_consumption').notNull(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});


export type InsertMetric = typeof metricsTable.$inferInsert;
export type SelectMetric = typeof metricsTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export type InsertOrganization = typeof organizationsTable.$inferInsert;
export type SelectOrganization = typeof organizationsTable.$inferSelect;
