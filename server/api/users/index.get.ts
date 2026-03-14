import { db } from '~/server/utils/db';
import { users } from '~/server/database/schema';

export default defineEventHandler(async () => {
  try {
    const allUsers = await db.select().from(users);
    return { data: allUsers };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch users'
    });
  }
});
