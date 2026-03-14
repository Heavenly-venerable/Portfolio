import { AuthService } from '~/server/services/AuthService';
import type { H3Event } from 'h3';

const authService = new AuthService();

export const login = async (event: H3Event) => {
  try {
    const body = await readBody(event);

    // Validate input
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      });
    }

    const result = await authService.login(body);

    if (!result.success) {
      throw createError({
        statusCode: 401,
        message: result.message
      });
    }

    // Set session using nuxt-auth-utils
    await setUserSession(event, {
      user: result.user!,
      loggedInAt: Date.now()
    });

    // Set JWT token in cookie for API authentication
    setCookie(event, 'token', result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return {
      success: true,
      user: result.user
    };
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

export const register = async (event: H3Event) => {
  try {
    const body = await readBody(event);

    // Validate input
    if (!body.email || !body.password || !body.name) {
      throw createError({
        statusCode: 400,
        message: 'Name, email and password are required'
      });
    }

    const result = await authService.register(body);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: result.message
      });
    }

    return {
      success: true,
      user: result.user
    };
  } catch (error: any) {
    console.error('Register error:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

export const logout = async (event: H3Event) => {
  try {
    // Clear session using nuxt-auth-utils
    await clearUserSession(event);

    // Clear token cookie
    deleteCookie(event, 'token');

    return {
      success: true,
      message: 'Logged out successfully'
    };
  } catch (error: any) {
    console.error('Logout error:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

export const getMe = async (event: H3Event) => {
  try {
    // Get session using nuxt-auth-utils
    const session = await getUserSession(event);

    if (!session.user) {
      throw createError({
        statusCode: 401,
        message: 'Not authenticated'
      });
    }

    return {
      success: true,
      user: session.user
    };
  } catch (error: any) {
    console.error('Get me error:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

export const verifyToken = async (event: H3Event) => {
  try {
    const token = getCookie(event, 'token') || event.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return { valid: false };
    }

    const result = await authService.validateToken(token);
    return result;
  } catch (error) {
    return { valid: false };
  }
};
