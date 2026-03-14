import type { Project } from '~/types';

export const useProjects = () => {
  const { get, post, put, delete: del } = useApi();

  const projects = ref<Project[]>([]);
  const featuredProjects = ref<Project[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await get<Project[]>('/projects');
      projects.value = data || [];
    } catch (e: any) {
      console.error('Error fetching projects:', e);
      error.value = e.message || 'Failed to fetch projects';
      projects.value = [];
    } finally {
      loading.value = false;
    }
  };

  const fetchFeaturedProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await get<Project[]>('/projects/featured');
      featuredProjects.value = data || [];
    } catch (e: any) {
      console.error('Error fetching featured projects:', e);
      error.value = e.message || 'Failed to fetch featured projects';
      featuredProjects.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createProject = async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    loading.value = true;
    error.value = null;
    try {
      const newProject = await post<Project>('/projects', data);
      if (newProject) {
        projects.value.push(newProject);
      }
      return newProject;
    } catch (e: any) {
      console.error('Error creating project:', e);
      error.value = e.message || 'Failed to create project';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const getProjectById = async (id: number) => {
    if (isNaN(id) || id <= 0) {
      error.value = 'Invalid project ID';
      return null;
    }

    loading.value = true;
    error.value = null;
    try {
      return await get<Project>(`/projects/${id}`);
    } catch (e: any) {
      console.error('Error fetching project:', e);
      error.value = e.message || 'Failed to fetch project';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateProject = async (id: number, data: Partial<Project>) => {
    if (isNaN(id) || id <= 0) {
      error.value = 'Invalid project ID';
      return null;
    }

    loading.value = true;
    error.value = null;
    try {
      const updated = await put<Project>(`/projects/${id}`, data);
      if (updated) {
        const index = projects.value.findIndex(p => p.id === id);
        if (index !== -1) {
          projects.value[index] = updated;
        }
        // Update featured projects if needed
        const featuredIndex = featuredProjects.value.findIndex(p => p.id === id);
        if (featuredIndex !== -1) {
          if (updated.isFeatured) {
            featuredProjects.value[featuredIndex] = updated;
          } else {
            featuredProjects.value = featuredProjects.value.filter(p => p.id !== id);
          }
        } else if (updated.isFeatured) {
          featuredProjects.value.push(updated);
        }
      }
      return updated;
    } catch (e: any) {
      console.error('Error updating project:', e);
      error.value = e.message || 'Failed to update project';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteProject = async (id: number) => {
    if (isNaN(id) || id <= 0) {
      error.value = 'Invalid project ID';
      return false;
    }

    loading.value = true;
    error.value = null;
    try {
      await del(`/projects/${id}`);
      projects.value = projects.value.filter(p => p.id !== id);
      featuredProjects.value = featuredProjects.value.filter(p => p.id !== id);
      return true;
    } catch (e: any) {
      console.error('Error deleting project:', e);
      error.value = e.message || 'Failed to delete project';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const toggleFeatured = async (id: number) => {
    if (isNaN(id) || id <= 0) {
      error.value = 'Invalid project ID';
      return null;
    }

    loading.value = true;
    error.value = null;
    try {
      const updated = await post<Project>(`/projects/${id}/featured`, {});
      if (updated) {
        const index = projects.value.findIndex(p => p.id === id);
        if (index !== -1) {
          projects.value[index] = updated;
        }
        // Update featured projects
        if (updated.isFeatured) {
          if (!featuredProjects.value.find(p => p.id === id)) {
            featuredProjects.value.push(updated);
          } else {
            const fIndex = featuredProjects.value.findIndex(p => p.id === id);
            if (fIndex !== -1) featuredProjects.value[fIndex] = updated;
          }
        } else {
          featuredProjects.value = featuredProjects.value.filter(p => p.id !== id);
        }
      }
      return updated;
    } catch (e: any) {
      console.error('Error toggling featured:', e);
      error.value = e.message || 'Failed to toggle featured';
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    projects,
    featuredProjects,
    loading,
    error,
    fetchProjects,
    fetchFeaturedProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
  };
};
