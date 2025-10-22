// lib/api/investment-api.ts
import { Investment, InvestmentDetails, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const investmentApi = {
  // Get all investments
  getAllInvestments: async (searchTerm?: string): Promise<ApiResponse<Investment[]>> => {
    const url = searchTerm 
      ? `${API_BASE_URL}/investment/all?searchTerm=${encodeURIComponent(searchTerm)}`
      : `${API_BASE_URL}/investment/all`;
    
    const response = await fetch(url, {
      cache: 'no-store'
    });
    return response.json();
  },

  // Get investment details
  getInvestmentDetails: async (id: number): Promise<ApiResponse<InvestmentDetails>> => {
    const response = await fetch(`${API_BASE_URL}/investment/${id}`, {
      cache: 'no-store'
    });
    return response.json();
  },
  getUserInvestments: async (userId: number): Promise<ApiResponse<Investment[]>> => {
    const response = await fetch(`${API_BASE_URL}/investment/all-user?userId=${userId}`, {
      cache: 'no-store'
    });
    return response.json();
  },


  updateInvestmentStatus: async (investmentId: number, status: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/investment/update/${investmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
    }
  },

};