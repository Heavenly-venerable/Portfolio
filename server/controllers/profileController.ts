import { ProfileService } from '~/server/services/ProfileService';
import type { H3Event } from 'h3';

const service = new ProfileService();

export const getProfile = async () => {
  return await service.getProfile();
};

export const updateProfile = async (event: H3Event) => {
  const body = await readBody(event);
  return await service.updateProfile(body);
};
