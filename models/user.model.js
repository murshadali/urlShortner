import {pgTable,uuid,varchar,text,timestamp} from "drizzle-orm/pg-core";
export const  userTable = pgTable('users',{
    id:uuid().primaryKey().defaultRandom(),
    firstName: varchar('first_name',{length:50}),
    lastName : varchar('last_name',{length:50}),
    email: varchar({length:100}).notNull().unique(),
    password:text().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(()=>new Date()),

});
  