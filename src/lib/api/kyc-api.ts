// lib/api/kyc-api.ts
import { KYCData, CreateKYCData, ApiResponse } from '@/types/kyc';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const kycApi = {
  // Get user KYC request
  getUserKYC: async (userId: number): Promise<ApiResponse<KYCData | null>> => {
    const response = await fetch(`${API_BASE_URL}/kyc/user/${userId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  // Create KYC request
  createKYC: async (data: CreateKYCData): Promise<ApiResponse<KYCData>> => {
    const response = await fetch(`${API_BASE_URL}/kyc/create`, {
      method: 'POST',
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