export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase || '/api';

  const fetchApi = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add token from cookie if available (browser only)
    if (process.client) {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include', // Important for cookies
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));

        // If unauthorized, redirect to login
        if (response.status === 401 && process.client) {
          const { clear } = useUserSession();
          await clear();
          window.location.href = '/login';
        }

        throw new Error(error.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  return {
    get: <T>(endpoint: string) => fetchApi<T>(endpoint),
    post: <T>(endpoint: string, data: any) =>
      fetchApi<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
    put: <T>(endpoint: string, data: any) =>
      fetchApi<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
    delete: <T>(endpoint: string) =>
      fetchApi<T>(endpoint, { method: 'DELETE' }),
  };
};
