import { MessageService } from '~/server/services/MessageService';
import type { H3Event } from 'h3';

const service = new MessageService();

export const getMessages = async () => {
  return await service.getAllMessages();
};

export const getUnreadMessages = async () => {
  return await service.getUnreadMessages();
};

export const getMessage = async (event: H3Event) => {
  const id = Number(event.context.params?.id);
  return await service.getMessageById(id);
};

export const createMessage = async (event: H3Event) => {
  const body = await readBody(event);
  return await service.createMessage(body);
};

export const markAsRead = async (event: H3Event) => {
  const id = Number(event.context.params?.id);
  return await service.markAsRead(id);
};

export const deleteMessage = async (event: H3Event) => {
  const id = Number(event.context.params?.id);
  return await service.deleteMessage(id);
};
