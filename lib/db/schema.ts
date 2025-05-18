import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
    // Unique identifier for each file/folder
    id: uuid("id").defaultRandom().primaryKey(),

    // Basic file/folder information
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),

    // Storage information
    fileUrl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),

    // Ownernship and hierarchy
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"),

    // File/folder flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    // Timestamps 
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const filesRelations = relations(files, ({ one, many }) => ({
    // Relationship to parent folder 
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
    }),
    // Relationship to child files/folders
    children: many(files),
}));

export type file = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
