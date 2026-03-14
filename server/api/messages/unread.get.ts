import { getUnreadMessages } from '~/server/controllers/messageController';

export default defineEventHandler(getUnreadMessages);
