import { ProfileModel } from '~/server/models/ProfileModel';
import type { NewProfile } from '~/server/database/schema';

export class ProfileService {
  private model = new ProfileModel();

  async getProfile() {
    return await this.model.getProfile();
  }

  async updateProfile(data: Partial<NewProfile>) {
    return await this.model.updateProfile(data);
  }
}
