// types/user.ts
export enum Role {
    INVESTOR = 'INVESTOR',
    ADMIN = 'ADMIN'
  }
  
  export enum Status {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    BLOCKED = 'BLOCKED'
  }
  
  export interface User {
    id: number;
    name?: string;
    email?: string;
    password: string;
    photo?: string;
    address?: string;
    phone: string;
    role: Role;
    status: Status;
    createdAt: string;
  }
  
  export interface UpdateUserData {
    name?: string;
    email?: string;
    photo?: string;
    address?: string;
    phone?: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }