import { eq } from 'drizzle-orm';
import { db } from '~/server/utils/db';
import { users, type NewUser, type User } from '~/server/database/schema';

export class UserModel {
  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.email, email));
      return result[0];
    } catch (error) {
      console.error('Error finding user by email:', error);
      return undefined;
    }
  }

  async findById(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error('Error finding user by id:', error);
      return undefined;
    }
  }

  async create(data: NewUser): Promise<User | undefined> {
    try {
      const result = await db.insert(users).values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      return undefined;
    }
  }

  async update(id: number, data: Partial<NewUser>): Promise<User | undefined> {
    try {
      const result = await db.update(users)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await db.delete(users).where(eq(users.id, id)).returning();
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await db.select().from(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
}
