import { useState } from 'react';
import { useToast } from '../contexts/ToastProvider';
import {
  type Ability,
  type Pokemon,
  type PokemonByIdResponse,
  type PokemonForm,
  type PokemonMoves,
  type PokemonSpecies,
  type PokemonType,
} from '../types/index';
import { useCache } from './useCache';

export type SectionDetails = {
  abilities: Ability[] | null;
  moves: PokemonMoves[] | null;
  types: PokemonType[] | null;
  species: PokemonSpecies[] | null;
  forms: PokemonForm[] | null;
};

type SectionLoading = {
  abilities: boolean;
  types: boolean;
  moves: boolean;
  forms: boolean;
  species: boolean;
};

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

  const fetchPokemonDetails = async (id: number) => {
    const cacheKey = `pokemon-${id}`;
    const cache = await getCache<Pokemon, {}>(cacheKey);

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
      const response = await fetch(`http://localhost:4000/api/pokemons/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionDetails = async (
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
    const cache = await getCache<SectionDetails, {}>(cacheKey);

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
  };

  return {
    pokemon,
    loading,
    fetchPokemonDetails,
    fetchSectionDetails,
    details,
    loadingDetails,
  };
};
