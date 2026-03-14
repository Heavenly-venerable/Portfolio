import type { Skill } from '~/types';

export const useSkills = () => {
  const { get, post, put, delete: del } = useApi();

  const skills = ref<Skill[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchSkills = async () => {
    loading.value = true;
    error.value = null;
    try {
      skills.value = await get<Skill[]>('/skills');
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const createSkill = async (data: Omit<Skill, 'id' | 'createdAt'>) => {
    loading.value = true;
    error.value = null;
    try {
      const newSkill = await post<Skill>('/skills', data);
      skills.value.push(newSkill);
      return newSkill;
    } catch (e: any) {
      error.value = e.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateSkill = async (id: number, data: Partial<Skill>) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await put<Skill>(`/skills/${id}`, data);
      const index = skills.value.findIndex(s => s.id === id);
      if (index !== -1) {
        skills.value[index] = updated;
      }
      return updated;
    } catch (e: any) {
      error.value = e.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteSkill = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await del(`/skills/${id}`);
      skills.value = skills.value.filter(s => s.id !== id);
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateOrder = async (updates: { id: number; order: number }[]) => {
    loading.value = true;
    error.value = null;
    try {
      await put('/skills/order', updates);
      await fetchSkills(); // Refresh data
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    skills,
    loading,
    error,
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
    updateOrder,
  };
};
