import { asc, eq, desc } from 'drizzle-orm';
import { db } from '~/server/utils/db';
import { projects, type NewProject, type Project } from '~/server/database/schema';

export class ProjectModel {
  async getAll(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.isFeatured), asc(projects.order));
  }

  async getFeatured(): Promise<Project[]> {
    return await db.select()
      .from(projects)
      .where(eq(projects.isFeatured, true))
      .orderBy(asc(projects.order));
  }

  async getById(id: number): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }

  async create(data: NewProject): Promise<Project> {
    const result = await db.insert(projects).values({ ...data, createdAt: new Date(), updatedAt: new Date() }).returning();
    return result[0];
  }

  async update(id: number, data: Partial<NewProject>): Promise<Project | undefined> {
    const { createdAt, ...updatedData } = data
    const result = await db.update(projects)
      .set({ ...updatedData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  async toggleFeatured(id: number): Promise<Project | undefined> {
    const project = await this.getById(id);
    if (!project) return undefined;

    const result = await db.update(projects)
      .set({ isFeatured: !project.isFeatured, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }
}
