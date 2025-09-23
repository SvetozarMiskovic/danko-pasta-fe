import { useState } from 'react';
import usePokemons from '../../hooks/usePokemons';
import Pagination from '../Reusable/Pagination/Pagination';
import PokemonModal from '../PokemonModal/PokemonModal';
import PokemonListCard from './PokemonListCard';
import { Annoyed } from 'lucide-react';
import { useSearchParams } from '../../hooks/useSearchParams';
import Loading from '../Reusable/Loading';
import { useTheme } from '../../contexts/ThemeContextProvider';
import AppInput from '../Reusable/AppInput';
import { useTranslate } from '../../hooks/useTranslate';

const PokemonList = () => {
  const [hoveredPokemon, setHoveredPokemon] = useState<string | null>(null);
  const { pokemons, loading, pagination, goNextPage, goPrevPage } =
    usePokemons();
  const { search, updateSearchParams } = useSearchParams();
  const [searchString, setSearchString] = useState(() => search || '');
  const { theme } = useTheme();
  const isLight = theme === 'light';
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchString(e.target.value);
    updateSearchParams({ page: 1, search: e.target.value.toString() });
  }
  const { t } = useTranslate();
  return (
    <div className='w-full max-w-7xl mx-auto place-self-start duration-200 p-2'>
      <div className='flex flex-col gap-2'>
        <h1
          className={`text-center text-3xl ${
            isLight ? 'text-black' : 'text-white'
          } font-bold`}
        >
          {t('pokemon_list_main')}
        </h1>
        <div
          className={` flex flex-1 items-center justify-center gap-1 italic ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          <h2 className='text-md'>{t('pokemon_list_count')}: </h2>
          <h2 className='text-md'>{pagination?.totalItems}</h2>
        </div>
        <div className='my-2 flex gap-2 w-full flex-1'>
          <AppInput
            label={t('pokemon_list_search')}
            value={searchString}
            onChange={handleSearch}
            placeholder={t('pokemon_list_search')}
            type='text'
            inputStyle={`${
              isLight ? 'text-black bg-white' : 'text-white bg-gray-800'
            } text-xl italic outline-0 border border-gray-400`}
            labelStyle={`text-2xl font-bold ${
              isLight ? 'text-black' : 'text-white'
            }`}
            wrapperStyle='my-2 flex flex-col gap-2 w-full flex-1'
          />
        </div>

        {pokemons.length > 0 && (
          <Pagination
            loading={loading}
            pagination={pagination}
            goNextPage={goNextPage}
            goPrevPage={goPrevPage}
          />
        )}

        {loading ? (
          <Loading text='Loading Pokemons...' />
        ) : (
          <ul className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid w-full gap-4'>
            {pokemons.map((pokemon) => {
              const { backDefault, backShiny, frontDefault, frontShiny } =
                pokemon.sprites;

              return (
                <PokemonModal
                  id={pokemon.id}
                  key={pokemon.name}
                  trigger={
                    <PokemonListCard
                      pokeName={pokemon.name}
                      hoveredPokemon={hoveredPokemon}
                      onMouseEnter={() => setHoveredPokemon(pokemon.name)}
                      onMouseLeave={() => setHoveredPokemon(null)}
                      backDefault={backDefault as string}
                      backShiny={backShiny as string}
                      frontDefault={frontDefault as string}
                      frontShiny={frontShiny as string}
                    />
                  }
                  title={t('pokemon_list_main')}
                />
              );
            })}
          </ul>
        )}
        {pokemons.length > 0 && (
          <Pagination
            loading={loading}
            pagination={pagination}
            goNextPage={goNextPage}
            goPrevPage={goPrevPage}
          />
        )}
        {pokemons.length < 1 && !loading && (
          <div
            className={`p-4 border-t border-black ${
              isLight ? 'text-black' : 'text-white'
            } text-3xl flex items-center justify-center gap-4`}
          >
            <Annoyed size={50} /> Sorry, couldn't find "{search}"
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
