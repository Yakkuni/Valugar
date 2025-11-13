// src/hooks/useListings.ts
import { useState, useCallback } from 'react';
import { 
  createListing, 
  deleteListing, 
  getListingById, 
  updateListing 
} from '../services/listingService';
import { Listing, CreateListingRequest } from '../types';

export const useListings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);

  const create = useCallback(async (data: CreateListingRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createListing(data);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erro ao criar anúncio');
      setLoading(false);
      throw err;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteListing(id);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar anúncio');
      setLoading(false);
      throw err;
    }
  }, []);

  const getById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getListingById(id);
      setListing(data);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar anúncio');
      setLoading(false);
      throw err;
    }
  }, []);

  const update = useCallback(async (id: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateListing(id, data);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar anúncio');
      setLoading(false);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    listing,
    create,
    remove,
    getById,
    update,
  };
};
