import { db } from '~/server/utils/db';
import { users } from '~/server/database/schema';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    const newUser = await db.insert(users).values({
      name: body.name,
      email: body.email
    }).returning();
    
    return { data: newUser[0] };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to create user'
    });
  }
});
