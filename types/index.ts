export interface Profile {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  updatedAt: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  order: number;
  createdAt: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  year: string;
  description: string;
  technologies: string[];
  features: string[];
  hasGithub: boolean;
  githubUrl?: string;
  hasUrl: boolean;
  url?: string;
  isFeatured: boolean;
  imageUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
}

export interface JwtPayload {
  id: number
  email: string
  role: string
  exp?: number
}
