// src/services/listingService.ts
import api from './api';

// ==================== INTERFACES ====================

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
  type: 'SALE' | 'RENT';
  category: 'RESIDENCIAL' | 'COMERCIAL' | 'MISTO';
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
  type: 'SALE' | 'RENT';
  category: 'RESIDENCIAL' | 'COMERCIAL' | 'MISTO';
  basePrice: number;
  iptu: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  details: ListingDetails;
}

// ==================== LISTING ENDPOINTS ====================

/**
 * POST /listing/register
 * Cria um novo anúncio
 */
export const createListing = async (data: CreateListingRequest): Promise<CreateListingResponse> => {
  try {
    const response = await api.post<CreateListingResponse>('/listing/register', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao criar anúncio' };
  }
};

/**
 * DELETE /listing/{id}
 * Deleta um anúncio pelo ID (somente admins ou dono do post)
 */
export const deleteListing = async (id: string): Promise<void> => {
  try {
    await api.delete(`/listing/${id}`);
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao deletar anúncio' };
  }
};

/**
 * GET /listing/{id}
 * Busca um anúncio pelo ID
 */
export const getListingById = async (id: string): Promise<Listing> => {
  try {
    const response = await api.get<Listing>(`/listing/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao buscar anúncio' };
  }
};

/**
 * PUT /listing/{id}
 * Edita um anúncio já existente (NÃO FINALIZADO)
 */
export const updateListing = async (id: string, data: any): Promise<any> => {
  try {
    const response = await api.put(`/listing/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao atualizar anúncio' };
  }
};