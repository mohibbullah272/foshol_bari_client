// lib/api/user-api.ts
import { User, UpdateUserData, ApiResponse } from '@/types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const userApi = {
  // Get user profile
  getUserProfile: async (userId: number): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/user/details?userId=${userId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  // Update user profile
  updateUserProfile: async (userId: number, data: UpdateUserData): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/user/update?userId=${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};