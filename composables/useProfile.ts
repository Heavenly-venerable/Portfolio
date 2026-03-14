import type { Profile } from '~/types';

export const useProfile = () => {
  const { get, put } = useApi();

  const profile = ref<Profile | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProfile = async () => {
    loading.value = true;
    error.value = null;
    try {
      profile.value = await get<Profile>('/profile');
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    loading.value = true;
    error.value = null;
    try {
      profile.value = await put<Profile>('/profile', data);
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
  };
};
