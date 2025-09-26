import { useCallback, useState } from 'react';
import { useToast } from '../contexts/ToastProvider';
import {
  type Pokemon,
  type PokemonByIdResponse,
  type SectionDetails,
  type SectionLoading,
} from '../types/index';
import { useCache } from './useCache';
import { URL_CONSTANTS } from '../constants';

export const usePokemonDetails = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState<SectionLoading>({
    abilities: false,
    moves: false,
    types: false,
    forms: false,
    species: false,
  });
  const { addToast } = useToast();
  const [details, setDetails] = useState<SectionDetails>({
    abilities: null,
    types: null,
    moves: null,
    forms: null,
    species: null,
  });
  const { getCache, setCache } = useCache();

  const fetchPokemonDetails = useCallback(
    async (id: number) => {
      const cacheKey = `pokemon-${id}`;
      const cache = await getCache<Pokemon, Record<string, unknown>>(cacheKey);

      if (cache) {
        cache.data.sprites.other['official-artwork'].front_default =
          URL.createObjectURL(
            cache.data.sprites.other['official-artwork'].front_default as Blob
          );
        setPokemon(cache.data as Pokemon);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          URL_CONSTANTS.FETCH_POKEMON_ID(id.toString()),
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

        const data: PokemonByIdResponse = await response.json();
        const imageResponse = await fetch(
          data.data.sprites.other['official-artwork'].front_default as string
        );

        const image = await imageResponse.blob();
        const cacheData: Pokemon = {
          ...data.data,
          sprites: {
            ...data.data.sprites,
            other: {
              'official-artwork': {
                front_default: image,
                front_shiny:
                  data.data.sprites.other['official-artwork'].front_shiny,
              },
            },
          },
        };
        data.data.sprites.other['official-artwork'].front_default =
          URL.createObjectURL(image);

        setCache(`pokemon-${id}`, cacheData, {});
        setLoading(false);
        setPokemon(data.data);
      } catch (error) {
        console.warn(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setCache, setLoading, setPokemon, getCache]
  );

  const fetchSectionDetails = useCallback(
    async (
      section: keyof SectionDetails | keyof SectionLoading,
      items: { name: string; url: string }[],
      id: string
    ) => {
      setLoadingDetails((prev) => {
        return {
          ...prev,
          [section]: true,
        };
      });

      const cacheKey = `pokemon-${id}-${section}`;
      const cache = await getCache<SectionDetails, Record<string, unknown>>(
        cacheKey
      );

      if (cache) {
        setDetails((prev) => ({ ...prev, [section]: cache.data }));
        setLoadingDetails((prev) => {
          return {
            ...prev,
            [section]: false,
          };
        });
        return;
      }
      try {
        const results = await Promise.all(
          items.map((item) => fetch(item.url).then((r) => r.json()))
        );

        setDetails((prev) => ({ ...prev, [section]: results }));
        setCache(cacheKey, results, {});
        setLoadingDetails((prev) => {
          return {
            ...prev,
            [section]: false,
          };
        });
      } catch (err) {
        addToast(`Failed to load ${section}`, 'error');
        console.error('Error fetching details', err);
        setLoadingDetails((prev) => {
          return {
            ...prev,
            [section]: false,
          };
        });
      }
    },
    [setLoadingDetails, setCache, getCache, setDetails, addToast]
  );

  return {
    pokemon,
    loading,
    fetchPokemonDetails,
    fetchSectionDetails,
    details,
    loadingDetails,
  };
};
