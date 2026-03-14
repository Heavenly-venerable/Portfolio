import { asc, eq } from 'drizzle-orm';
import { db } from '~/server/utils/db';
import { skills, type NewSkill, type Skill } from '~/server/database/schema';

export class SkillModel {
  async getAll(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(asc(skills.order));
  }

  async getById(id: number): Promise<Skill | undefined> {
    const result = await db.select().from(skills).where(eq(skills.id, id));
    return result[0];
  }

  async create(data: NewSkill): Promise<Skill> {
    const result = await db.insert(skills).values({ ...data, createdAt: new Date() }).returning();
    return result[0];
  }

  async update(id: number, data: Partial<NewSkill>): Promise<Skill | undefined> {
    const result = await db.update(skills)
      .set(data)
      .where(eq(skills.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id)).returning();
    return result.length > 0;
  }

  async updateOrder(updates: { id: number; order: number }[]): Promise<void> {
    for (const item of updates) {
      await db.update(skills)
        .set({ order: item.order })
        .where(eq(skills.id, item.id));
    }
  }
}
