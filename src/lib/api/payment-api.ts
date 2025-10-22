// lib/api/payment-api.ts
import { 
    CreatePaymentMethodData, 
    UpdatePaymentMethodData, 
    PaymentMethod, 
    ApiResponse 
  } from '@/types';
  import { CreatePaymentData, PaymentResponse} from '@/types/payment';
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  
  export const paymentApi = {
    // Get all payment methods
    getAllPaymentMethods: async (): Promise<ApiResponse<PaymentMethod[]>> => {
      const response = await fetch(`${API_BASE_URL}/payment-method/all`);
      return response.json();
    },
  
    // Get specific payment method
    getPaymentMethod: async (id: number): Promise<ApiResponse<PaymentMethod>> => {
      const response = await fetch(`${API_BASE_URL}/payment-method/${id}`);
      return response.json();
    },
  
    // Create payment method
    createPaymentMethod: async (data: CreatePaymentMethodData): Promise<ApiResponse<PaymentMethod>> => {
      const response = await fetch(`${API_BASE_URL}/payment-method/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  
    // Update payment method
    updatePaymentMethod: async (id: number, data: UpdatePaymentMethodData): Promise<ApiResponse<PaymentMethod>> => {
      const response = await fetch(`${API_BASE_URL}/payment-method/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  
    // Delete payment method
    deletePaymentMethod: async (id: number): Promise<ApiResponse<void>> => {
      const response = await fetch(`${API_BASE_URL}/payment-method/delete/${id}`, {
        method: 'DELETE',
      });
      return response.json();
    },

    createPayment: async (data: CreatePaymentData): Promise<ApiResponse<PaymentResponse>> => {
      const response = await fetch(`${API_BASE_URL}/payments/create`, {
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