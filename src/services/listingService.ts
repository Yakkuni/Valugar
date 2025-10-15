// src/services/listingService.ts
import api from './api';

// Define a interface para os dados do anúncio, baseada no DTO do backend
// Isso ajuda com o autocompletar e a segurança de tipos
export interface CreateListingPayload {
  title: string;
  description?: string;
  type: "CASA" | "APARTAMENTO" | "KITNET" | "QUARTO" | "SITIO" | "OUTRO";
  category: "RESIDENTIAL" | "COMMERCIAL" | "MIXED_USE";
  basePrice: number;
  iptu?: number;
  userId: string;
  address: {
    zipCode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    reference?: string | null;
  };
  details: {
    area: number;
    bedrooms: number;
    bathrooms: number;
    doesntPayWaterBill: boolean;
    hasGarage: boolean;
    isPetFriendly: boolean;
    hasCeramicFlooring: boolean;
    hasCeilingLining: boolean;
    hasBackyard: boolean;
    hasPool: boolean;
    hasSolarPanel: boolean;
  };
}

export const createListing = async (payload: CreateListingPayload) => {
  try {
    const response = await api.post('/listing/register', payload);
    return response.data; // Deve retornar { id: "string" }
  } catch (error: any) {
    // Lança o erro para ser tratado no componente
    throw error.response?.data || new Error('Ocorreu um erro desconhecido');
  }
};