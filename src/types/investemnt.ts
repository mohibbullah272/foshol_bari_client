import { IProject } from './index';

  
  export interface Investment {
    id: number;
    userId: number;
    projectId: number;
    shareBought: number;
    totalAmount: number;
    method: string;
    paymentNumber: string;
    status:any
    createdAt: string;
    updatedAt: string;
    user?: {
      name: string;
      phone: string;
    };
    project?: IProject;
  }
  
  export interface InvestmentDetails extends Investment {
    user: {
      name: string;
      phone: string;
    };
    project: IProject;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }