import { SkillModel } from '~/server/models/SkillModel';
import type { NewSkill } from '~/server/database/schema';

export class SkillService {
  private model = new SkillModel();

  async getAllSkills() {
    return await this.model.getAll();
  }

  async getSkillById(id: number) {
    return await this.model.getById(id);
  }

  async createSkill(data: NewSkill) {
    return await this.model.create(data);
  }

  async updateSkill(id: number, data: Partial<NewSkill>) {
    return await this.model.update(id, data);
  }

  async deleteSkill(id: number) {
    return await this.model.delete(id);
  }

  async updateOrder(updates: { id: number; order: number }[]) {
    return await this.model.updateOrder(updates);
  }
}
