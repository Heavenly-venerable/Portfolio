import jwt from 'jsonwebtoken';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event) => {
  const path = event.path || '';
  const method = event.method;

  // ============================================
  // PUBLIC ROUTES - No authentication needed
  // ============================================

  // 1. Auth routes (login, register) - completely public
  if (path.startsWith('/api/auth/')) {
    // Allow login, register, verify without any auth check
    return;
  }

  // 2. Public GET routes - for frontend to fetch data
  const publicGetRoutes = [
    '/api/profile',
    '/api/skills',
    '/api/projects',
    '/api/projects/featured'
  ];

  if (method === 'GET' && publicGetRoutes.some(route => path.startsWith(route))) {
    return; // Allow public GET requests
  }

  // 3. Contact form submission - public POST
  if (path.startsWith('/api/messages') && method === 'POST') {
    return; // Allow public POST to contact form
  }

  // ============================================
  // PROTECTED ROUTES - Authentication required
  // ============================================

  // For dashboard pages (HTML)
  if (path.startsWith('/dashboard')) {
    try {
      const session = await getUserSession(event);
      if (!session?.user) {
        return sendRedirect(event, '/login');
      }
      // Add user to context for use in pages
      event.context.auth = { user: session.user };
      return;
    } catch {
      return sendRedirect(event, '/login');
    }
  }

  // For protected API routes (all other API endpoints)
  if (path.startsWith('/api/')) {
    return await requireAuth(event);
  }
});

async function requireAuth(event: H3Event) {
  try {
    // Method 1: Check session from nuxt-auth-utils
    const session = await getUserSession(event);
    if (session?.user) {
      // Set user in context for downstream use
      event.context.auth = { user: session.user };
      return;
    }

    // Method 2: Check JWT token from cookie or header
    const token = getCookie(event, 'token') ||
      event.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized - No token provided'
      });
    }

    // Verify JWT token
    const config = useRuntimeConfig();
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as any;

      // Optional: Check if user still exists in database
      // const userModel = new UserModel();
      // const user = await userModel.findById(decoded.id);
      // if (!user) throw new Error('User not found');

      // Set user in context
      event.context.auth = { user: decoded };

      return; // Authenticated via token
    } catch (jwtError) {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired token'
      });
    }
  } catch (error: any) {
    console.error('Auth error:', error);

    // Re-throw if it's already an H3Error
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 401,
      message: 'Authentication failed'
    });
  }
}
