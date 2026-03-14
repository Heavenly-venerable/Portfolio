import { MessageModel } from '~/server/models/MessageModel';
import type { NewMessage } from '~/server/database/schema';

export class MessageService {
  private model = new MessageModel();

  async getAllMessages() {
    return await this.model.getAll();
  }

  async getUnreadMessages() {
    return await this.model.getUnread();
  }

  async getMessageById(id: number) {
    return await this.model.getById(id);
  }

  async createMessage(data: NewMessage) {
    return await this.model.create(data);
  }

  async markAsRead(id: number) {
    return await this.model.markAsRead(id);
  }

  async deleteMessage(id: number) {
    return await this.model.delete(id);
  }
}
