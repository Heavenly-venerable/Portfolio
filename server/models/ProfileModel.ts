import { eq } from 'drizzle-orm';
import { db } from '~/server/utils/db';
import { profile, type NewProfile, type Profile } from '~/server/database/schema';

export class ProfileModel {
  async getProfile(): Promise<Profile | undefined> {
    const result = await db.select().from(profile).limit(1);
    return result[0];
  }

  async updateProfile(data: Partial<NewProfile>): Promise<Profile> {
    const existing = await this.getProfile();

    if (existing) {
      const result = await db.update(profile)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(profile.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(profile)
        .values(data as NewProfile)
        .returning();
      return result[0];
    }
  }
}
