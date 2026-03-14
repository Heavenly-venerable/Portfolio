import { ProjectService } from '~/server/services/ProjectService';
import type { H3Event } from 'h3';

const service = new ProjectService();

export const getProjects = async () => {
  try {
    return await service.getAllProjects();
  } catch (error) {
    console.error('Error in getProjects:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch projects'
    });
  }
};

export const getFeaturedProjects = async () => {
  try {
    return await service.getFeaturedProjects();
  } catch (error) {
    console.error('Error in getFeaturedProjects:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch featured projects'
    });
  }
};

export const getProject = async (event: H3Event) => {
  try {
    const idParam = event.context.params?.id;

    if (!idParam || idParam === 'featured') {
      throw createError({
        statusCode: 400,
        message: 'Invalid project ID'
      });
    }

    const id = Number(idParam);

    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: 'Project ID must be a valid number'
      });
    }

    const project = await service.getProjectById(id);

    if (!project) {
      throw createError({
        statusCode: 404,
        message: 'Project not found'
      });
    }

    return project;
  } catch (error: any) {
    console.error('Error in getProject:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch project'
    });
  }
};

export const createProject = async (event: H3Event) => {
  try {
    const body = await readBody(event);

    // Validasi required fields
    if (!body.title || !body.category || !body.description) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: title, category, description'
      });
    }

    return await service.createProject(body);
  } catch (error: any) {
    console.error('Error in createProject:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: 'Failed to create project'
    });
  }
};

export const updateProject = async (event: H3Event) => {
  try {
    const idParam = event.context.params?.id;

    if (!idParam) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required'
      });
    }

    const id = Number(idParam);

    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: 'Project ID must be a valid number'
      });
    }

    const body = await readBody(event);

    // Hapus field yang tidak boleh diupdate
    const { id: _, createdAt, ...cleanBody } = body;

    const updated = await service.updateProject(id, cleanBody);

    if (!updated) {
      throw createError({
        statusCode: 404,
        message: 'Project not found'
      });
    }

    return updated;
  } catch (error: any) {
    console.error('Error in updateProject:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: 'Failed to update project'
    });
  }
};

export const deleteProject = async (event: H3Event) => {
  try {
    const idParam = event.context.params?.id;

    if (!idParam) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required'
      });
    }

    const id = Number(idParam);

    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: 'Project ID must be a valid number'
      });
    }

    const deleted = await service.deleteProject(id);

    if (!deleted) {
      throw createError({
        statusCode: 404,
        message: 'Project not found'
      });
    }

    return { success: true, message: 'Project deleted successfully' };
  } catch (error: any) {
    console.error('Error in deleteProject:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: 'Failed to delete project'
    });
  }
};

export const toggleFeatured = async (event: H3Event) => {
  try {
    const idParam = event.context.params?.id;

    if (!idParam) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required'
      });
    }

    const id = Number(idParam);

    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: 'Project ID must be a valid number'
      });
    }

    const updated = await service.toggleFeatured(id);

    if (!updated) {
      throw createError({
        statusCode: 404,
        message: 'Project not found'
      });
    }

    return updated;
  } catch (error: any) {
    console.error('Error in toggleFeatured:', error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: 'Failed to toggle featured status'
    });
  }
};
