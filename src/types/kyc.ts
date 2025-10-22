// types/kyc.ts
export enum KycStatus {
  NOTREQUSTED = 'NOTREQUSTED',
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export interface KYCData {
  id: number;
  userId: number;
  nidNumber?: number;
  birthCertificateNumber?: number;
  passportNumber?: number;
  passportImage?: string;
  birthCertificateImage?: string;
  userImage: string;
  nidImage?: string;
  status: KycStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateKYCData {
  userId: number;
  nidNumber?: number;
  birthCertificateNumber?: number;
  passportNumber?: number;
  passportImage?: string;
  birthCertificateImage?: string;
  userImage: string;
  nidImage?: string;
  status?: KycStatus;
}
export interface KYC {
  id: number;
  userId: number;
  nidNumber?: number;
  birthCertificateNumber?: number;
  passportNumber?: number;
  passportImage?: string;
  birthCertificateImage?: string;
  userImage: string;
  nidImage?: string;
  status: 'NOTREQUSTED' | 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    phone: string;
    email: string;
    status: string;
    name?: string;
  };
}

export interface KYCResponsePayload {
  id: number;
  kycStatus: 'APPROVED' | 'REJECTED';
  userId: number;
  UserStatus: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}