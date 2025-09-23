import { useEffect, useState } from 'react';
import { useSearchParams } from './useSearchParams';
import {
  type PaginationMeta,
  type PokemonListItemResponse,
} from './usePokemons';
import { useCache } from './useCache';
import type { NamedAPIResource } from '../types';
import env from '../env';

export const useLocations = () => {
  const [locations, setLocations] = useState<{ name: string; url: string }[]>(
    []
  );
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const { getCache, setCache } = useCache();
  const { page, limit, updateSearchParams } = useSearchParams();

  useEffect(() => {
    updateSearchParams({ page, limit });
  }, []);

  useEffect(() => {
    fetchLocations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  async function fetchLocations() {
    const searchQuery = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    }).toString();
    try {
      const cachedData = await getCache<NamedAPIResource[], PaginationMeta>(
        `locations-${searchQuery}`
      );
      if (cachedData) {
        setLocations(cachedData.data);
        setPagination(cachedData.pagination);
        setLoadingLocations(false);
        return;
      }
      setLoadingLocations(true);

      const isDev = env.VITE_NODE_ENV === 'development';

      const response = await fetch(
        isDev
          ? env.VITE_DEV_SERVER
          : `${env.VITE_PROD_SERVER}/api/pokemons/locations?${searchQuery}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) throw new Error('Failed to fetch locations');

      const data: PokemonListItemResponse = await response.json();
      setCache<NamedAPIResource[], PaginationMeta>(
        `locations-${searchQuery}`,
        data.data,
        data.pagination
      );
      setLocations(data.data);
      setPagination(data.pagination);
      setLoadingLocations(false);
    } catch (error) {
      console.warn(error);
    }
  }

  const goNextPage = (page: number) => {
    updateSearchParams({ page: page + 1 });
  };

  const goPrevPage = (page: number) => {
    updateSearchParams({ page: page - 1 });
  };
  return {
    locations,
    loadingLocations,
    fetchLocations,
    pagination,
    goNextPage,
    goPrevPage,
  };
};
