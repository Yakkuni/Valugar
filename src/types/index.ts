// src/types/index.ts

// ==================== AUTH TYPES ====================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RegisterUserRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
}

export interface RegisterAdminRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
  creationCode: string;
}

export interface RegisterResponse {
  id: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'user';
  createdAt: string;
  isBlocked: boolean;
}

// ==================== LISTING TYPES ====================

export type ListingType = 'SALE' | 'RENT';
export type ListingCategory = 'RESIDENCIAL' | 'COMERCIAL' | 'MISTO';

export interface Address {
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  reference?: string;
}

export interface ListingDetails {
  area: string;
  bedrooms: number;
  bathrooms: number;
}

export interface CreateListingRequest {
  title: string;
  description: string;
  type: ListingType;
  category: ListingCategory;
  basePrice: number;
  iptu: number;
  userId: string;
  address: Address;
  details: ListingDetails;
}

export interface CreateListingResponse {
  id: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  category: ListingCategory;
  basePrice: number;
  iptu: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  details: ListingDetails;
}
