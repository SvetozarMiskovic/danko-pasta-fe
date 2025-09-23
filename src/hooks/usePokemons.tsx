import { useEffect, useState } from 'react';
import { useSearchParams } from './useSearchParams';
import { useToast } from '../contexts/ToastProvider';
import { useCache } from './useCache';
import { useDebounce } from './useDebounce';

export interface SpritesResponse {
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
}

export interface SpritesData {
  backDefault: Blob | null;
  backShiny: Blob | null;
  frontDefault: Blob | null;
  frontShiny: Blob | null;
}
export interface PokemonListData {
  name: string;
  url: string;
  id: string | undefined;
  sprites: SpritesResponse | SpritesData;
}

export interface PaginationMeta {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PokemonListItemResponse {
  success: boolean;
  message: string;
  data: PokemonListData[];
  pagination: PaginationMeta;
}

export type SpriteKeys =
  | 'backDefault'
  | 'backShiny'
  | 'frontDefault'
  | 'frontShiny';

async function fetchSprite(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  return blob;
}
const usePokemons = () => {
  const [pokemons, setPokemons] = useState<PokemonListData[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();
  const { updateSearchParams, page, limit, search } = useSearchParams();
  const { getCache, setCache } = useCache();

  const debouncedSearch = useDebounce(search, 500);

  const fetchPokemons = async () => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: debouncedSearch,
    });
    const cache = await getCache<PokemonListData[], PaginationMeta>(
      queryParams.toString()
    );

    setLoading(true);

    if (cache) {
      const enrichedData = cache.data.map((d) => {
        let spriteObj: SpritesResponse = {
          backDefault: '',
          frontDefault: '',
          frontShiny: '',
          backShiny: '',
        };
        Object.entries(d.sprites).forEach(([key, value]) => {
          spriteObj[key as SpriteKeys] = URL.createObjectURL(value);
        });

        return { ...d, sprites: spriteObj };
      });
      setPokemons(enrichedData);
      setPagination(cache.pagination);
      setLoading(false);

      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/api/pokemons?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch pokemons');
      }
      const data: PokemonListItemResponse = await response.json();
      const enrichedData = await Promise.all(
        data.data.map(async (d) => {
          const sprites = Object.entries(d.sprites);
          const enrichedSprites: Record<SpriteKeys, Blob | null> = {
            backDefault: null,
            backShiny: null,
            frontDefault: null,
            frontShiny: null,
          };

          await Promise.all(
            sprites.map(async ([key, url]) => {
              if (!url) return;
              const blob = await fetchSprite(url);
              enrichedSprites[key as SpriteKeys] = blob;
            })
          );
          return { ...d, sprites: enrichedSprites as SpritesData };
        })
      );

      setLoading(false);
      setPokemons(data.data);
      setPagination(data.pagination);
      setCache(queryParams.toString(), enrichedData, data.pagination);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateSearchParams({ page, limit, search });
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page, limit, debouncedSearch]);

  const fetchPokemonDetails = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/pokemons/${id}}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch pokemons');
      }
      const data: PokemonListItemResponse = await response.json();

      setLoading(false);
      addToast(data.message, 'info');
      setPokemons(data.data);
      setPagination(data.pagination);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const goNextPage = (page: number) => {
    updateSearchParams({ page: page + 1 });
  };
  const goPrevPage = (page: number) => {
    updateSearchParams({ page: page - 1 });
  };

  return {
    pokemons,
    loading,
    error,
    pagination,
    goNextPage,
    goPrevPage,
    fetchPokemonDetails,
  };
};

export default usePokemons;
