import type { Message } from '~/types';

export const useMessages = () => {
  const { get, post, delete: del } = useApi();

  const messages = ref<Message[]>([]);
  const unreadCount = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchMessages = async () => {
    loading.value = true;
    error.value = null;
    try {
      messages.value = await get<Message[]>('/messages');
      unreadCount.value = messages.value.filter(m => !m.isRead).length;
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchUnreadMessages = async () => {
    loading.value = true;
    error.value = null;
    try {
      const unread = await get<Message[]>('/messages/unread');
      unreadCount.value = unread.length;
      return unread;
    } catch (e: any) {
      error.value = e.message;
      return [];
    } finally {
      loading.value = false;
    }
  };

  const sendMessage = async (data: Omit<Message, 'id' | 'createdAt' | 'isRead'>) => {
    loading.value = true;
    error.value = null;
    try {
      const newMessage = await post<Message>('/messages', data);
      messages.value.unshift(newMessage);
      unreadCount.value++;
      return newMessage;
    } catch (e: any) {
      error.value = e.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const markAsRead = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await post<Message>(`/messages/${id}/read`, {});
      const index = messages.value.findIndex(m => m.id === id);
      if (index !== -1) {
        messages.value[index] = updated;
        unreadCount.value = messages.value.filter(m => !m.isRead).length;
      }
      return updated;
    } catch (e: any) {
      error.value = e.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteMessage = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await del(`/messages/${id}`);
      messages.value = messages.value.filter(m => m.id !== id);
      unreadCount.value = messages.value.filter(m => !m.isRead).length;
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    messages,
    unreadCount,
    loading,
    error,
    fetchMessages,
    fetchUnreadMessages,
    sendMessage,
    markAsRead,
    deleteMessage,
  };
};
