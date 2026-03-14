import { eq, desc } from 'drizzle-orm';
import { db } from '~/server/utils/db';
import { Message, messages, NewMessage } from '~/server/database/schema';

export class MessageModel {
  async getAll(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  }

  async getUnread(): Promise<Message[]> {
    return await db.select()
      .from(messages)
      .where(eq(messages.isRead, false))
      .orderBy(desc(messages.createdAt));
  }

  async getById(id: number): Promise<Message | undefined> {
    const result = await db.select().from(messages).where(eq(messages.id, id));
    return result[0];
  }

  async create(data: NewMessage): Promise<Message> {
    const result = await db.insert(messages).values(data).returning();
    return result[0];
  }

  async markAsRead(id: number): Promise<Message | undefined> {
    const result = await db.update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.delete(messages).where(eq(messages.id, id)).returning();
    return result.length > 0;
  }
}
