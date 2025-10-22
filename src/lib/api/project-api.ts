// lib/api/project-api.ts
import { IProject ,ApiResponse, ProgressUpdateData} from '@/types';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const projectApi = {
  // Get all projects
  getAllProjects: async (): Promise<ApiResponse<IProject[]>> => {
    const response = await fetch(`${API_BASE_URL}/project/all`);
    return response.json();
  },

  // Get single project
  getProject: async (id: number): Promise<ApiResponse<IProject>> => {
    const response = await fetch(`${API_BASE_URL}/project/details/${id}`);
    return response.json();
  },

  // Update project
  updateProject: async (id: number, data: Partial<IProject>): Promise<ApiResponse<IProject>> => {
    const response = await fetch(`${API_BASE_URL}/project/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  updateProjectProgress: async (
    id: number, 
    data: ProgressUpdateData
  ): Promise<ApiResponse<IProject>> => {
    const response = await fetch(`${API_BASE_URL}/project/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  // Delete project
  deleteProject: async (id: number): Promise<ApiResponse<void>> => {
    const response = await fetch(`${API_BASE_URL}/project/delete/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};