import { ProjectModel } from '~/server/models/ProjectModel';
import type { NewProject } from '~/server/database/schema';

export class ProjectService {
  private model = new ProjectModel();

  async getAllProjects() {
    return await this.model.getAll();
  }

  async getFeaturedProjects() {
    return await this.model.getFeatured();
  }

  async getProjectById(id: number) {
    return await this.model.getById(id);
  }

  async createProject(data: NewProject) {
    if (!data.title || !data.category || !data.description) {
      throw new Error('Missing required fields');
    }
    return await this.model.create(data);
  }

  async updateProject(id: number, data: Partial<NewProject>) {
    if (isNaN(id) || id <= 0) {
      throw new Error('Invalid project ID');
    }

    const { id: _, createdAt, ...cleanData } = data as any;

    return await this.model.update(id, cleanData);
  }

  async deleteProject(id: number) {
    return await this.model.delete(id);
  }

  async toggleFeatured(id: number) {
    return await this.model.toggleFeatured(id);
  }
}
