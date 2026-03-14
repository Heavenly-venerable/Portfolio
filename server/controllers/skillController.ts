import { SkillService } from '~/server/services/SkillService';
import type { H3Event } from 'h3';

const service = new SkillService();

export const getSkills = async () => {
  return await service.getAllSkills();
};

export const getSkill = async (event: H3Event) => {
  const id = Number(event.context.params?.id);
  return await service.getSkillById(id);
};

export const createSkill = async (event: H3Event) => {
  const body = await readBody(event);
  return await service.createSkill(body);
};

export const updateSkill = async (event: H3Event) => {
  const id = Number(event.context.params?.id);
  const body = await readBody(event);
  return await service.updateSkill(id, body);
};

export const deleteSkill = async (event: H3Event) => {
  const id = Number(event.context.params?.id);
  return await service.deleteSkill(id);
};

export const updateSkillOrder = async (event: H3Event) => {
  const body = await readBody(event);
  return await service.updateOrder(body);
};
