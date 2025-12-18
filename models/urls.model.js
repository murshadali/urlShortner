import {pgTable, text,varchar,uuid,timestamp} from 'drizzle-orm/pg-core'
import {userTable} from './index.js';
export const urlsTable = pgTable("urls",{
    id: uuid().primaryKey().defaultRandom(),

    shortCode: varchar('code', {length:155}).unique(),
    targetUrl: text().notNull(),
    userId: uuid('user_id').references(()=>userTable.id).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(()=>new Date()),
})