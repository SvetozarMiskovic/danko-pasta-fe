import { useEffect, useState } from 'react';
import { useSearchParams } from './useSearchParams';
import {
  type PaginationMeta,
  type PokemonListItemResponse,
} from './usePokemons';
import { useCache } from './useCache';
import type { NamedAPIResource } from '../types';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const response = await fetch(
        `http://localhost:4000/api/pokemons/locations?${searchQuery}`,
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
