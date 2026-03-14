import { pgTable, serial, varchar, text, timestamp, boolean, jsonb, integer } from 'drizzle-orm/pg-core';

// Users table for authentication
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  role: varchar('role', { length: 50 }).default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Profile/Settings table
export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  subtitle: varchar('subtitle', { length: 200 }).notNull(),
  bio: text('bio').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  github: varchar('github', { length: 255 }),
  instagram: varchar('instagram', { length: 255 }),
  linkedin: varchar('linkedin', { length: 255 }),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Skills table
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  category: varchar('category', { length: 50 }).default('frontend'),
  order: integer('order').default(0), // Ubah dari serial ke integer dengan default
  createdAt: timestamp('created_at').defaultNow(),
});

// Projects table - sesuai dengan frontend
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  status: varchar('status', { length: 100 }).notNull(),
  year: varchar('year', { length: 10 }).notNull(),
  description: text('description').notNull(),
  technologies: jsonb('technologies').$type<string[]>().default([]),
  features: jsonb('features').$type<string[]>().default([]),
  hasGithub: boolean('has_github').default(false),
  githubUrl: varchar('github_url', { length: 500 }),
  hasUrl: boolean('has_url').default(false),
  url: varchar('url', { length: 500 }),
  isFeatured: boolean('is_featured').default(false),
  imageUrl: varchar('image_url', { length: 500 }),
  order: integer('order').default(0), // Ubah dari serial ke integer dengan default
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Contact messages table
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;

export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
