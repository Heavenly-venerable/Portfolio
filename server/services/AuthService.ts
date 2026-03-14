import { UserModel } from '~/server/models/UserModel';
import jwt from 'jsonwebtoken';
import type { LoginCredentials, RegisterData, JwtPayload } from '~/types';

export class AuthService {
  private userModel = new UserModel();
  private readonly jwtSecret: string;

  constructor() {
    const config = useRuntimeConfig();
    this.jwtSecret = config.jwtSecret as string;

    if (!this.jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
  }

  async login(credentials: LoginCredentials) {
    const { email, password } = credentials;

    // Find user by email
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }

    // Verify password using nuxt-auth-utils
    const isValid = await verifyPassword(user.password, password);

    if (!isValid) {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }

    // Generate JWT token
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role || 'admin'
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    };
  }

  async register(data: RegisterData) {
    const { email, password, name } = data;

    // Check if user already exists
    const existingUser = await this.userModel.findByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists'
      };
    }

    // Hash password using nuxt-auth-utils
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
      role: 'admin'
    });

    if (!newUser) {
      return {
        success: false,
        message: 'Failed to create user'
      };
    }

    // Generate JWT token
    const token = this.generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role || 'admin'
    });

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      },
      token
    };
  }

  async verifyToken(token: string): Promise<JwtPayload | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  private generateToken(payload: { id: number; email: string; role: string }): string {
    return jwt.sign(
      payload,
      this.jwtSecret,
      { expiresIn: '7d' } // Token expires in 7 days
    );
  }

  async validateToken(token: string) {
    const payload = await this.verifyToken(token);

    if (!payload) {
      return { valid: false };
    }

    // Check if user still exists
    const user = await this.userModel.findById(payload.id);

    if (!user) {
      return { valid: false };
    }

    return {
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
}
