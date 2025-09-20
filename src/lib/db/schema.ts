import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  varchar,
  boolean,
  index
} from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
}));

// User profiles table
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  timezone: varchar('timezone', { length: 100 }).default('UTC'),
  dailyMinWords: integer('daily_min_words').default(250),
  reminderWindowStart: varchar('reminder_window_start', { length: 10 }).default('09:00'),
  reminderWindowEnd: varchar('reminder_window_end', { length: 10 }).default('21:00'),
}, (table) => ({
  userIdIdx: index('profiles_user_id_idx').on(table.userId),
}));

// Projects table
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  targetWords: integer('target_words').default(70000),
  methodology: varchar('methodology', { length: 20 }).default('scenes'), // snowflake|scenes|none
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('projects_user_id_idx').on(table.userId),
}));

// Characters table (optional MVP-lite)
export const characters = pgTable('characters', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  goal: text('goal'),
  stakes: text('stakes'),
  flaw: text('flaw'),
}, (table) => ({
  projectIdIdx: index('characters_project_id_idx').on(table.projectId),
}));

// Scenes table
export const scenes = pgTable('scenes', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  index: integer('index').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  pov: varchar('pov', { length: 255 }),
  objective: text('objective'),
  conflict: text('conflict'),
  outcome: text('outcome'),
  status: varchar('status', { length: 20 }).default('planned'), // planned|drafting|done
}, (table) => ({
  projectIdIndexIdx: index('scenes_project_id_index_idx').on(table.projectId, table.index),
}));

// Scene content table
export const sceneContent = pgTable('scene_content', {
  id: uuid('id').primaryKey().defaultRandom(),
  sceneId: uuid('scene_id').references(() => scenes.id, { onDelete: 'cascade' }).notNull(),
  content: text('content').default(''),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  sceneIdIdx: index('scene_content_scene_id_idx').on(table.sceneId),
}));

// Sessions table
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  sceneId: uuid('scene_id').references(() => scenes.id, { onDelete: 'cascade' }),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  endedAt: timestamp('ended_at'),
  wordsWritten: integer('words_written').default(0),
  mode: varchar('mode', { length: 20 }).default('normal'), // write_forward|normal
  timerMinutes: integer('timer_minutes').default(25),
}, (table) => ({
  projectIdIdx: index('sessions_project_id_idx').on(table.projectId),
  startedAtIdx: index('sessions_started_at_idx').on(table.startedAt),
}));

// Snapshots table
export const snapshots = pgTable('snapshots', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  storageRef: text('storage_ref'), // JSON/text backup
}, (table) => ({
  projectIdIdx: index('snapshots_project_id_idx').on(table.projectId),
  createdAtIdx: index('snapshots_created_at_idx').on(table.createdAt),
}));

// Notes table
export const notes = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 20 }).notNull(), // todo|idea|fixlater
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  projectIdIdx: index('notes_project_id_idx').on(table.projectId),
}));

// Achievements table
export const achievements = pgTable('achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // first_7_day_streak|1k_words|10k_words|first_50k|first_draft_done
  awardedAt: timestamp('awarded_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('achievements_user_id_idx').on(table.userId),
  awardedAtIdx: index('achievements_awarded_at_idx').on(table.awardedAt),
}));

// Daily goals/streaks tracking
export const dailyGoals = pgTable('daily_goals', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  date: varchar('date', { length: 10 }).notNull(), // YYYY-MM-DD
  wordsWritten: integer('words_written').default(0),
  goalMet: boolean('goal_met').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdDateIdx: index('daily_goals_user_id_date_idx').on(table.userId, table.date),
}));