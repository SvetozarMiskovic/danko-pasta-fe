import PokemonStatCardWrapper from '../PokemonDetails/PokemonBaseStats/PokemonStatCardWrapper';
import PokemonStatDetailShort from '../PokemonDetails/PokemonBaseStats/PokemonStatDetailShort';
import PokemonStatCard from '../PokemonDetails/PokemonBaseStats/PokemonStatCard';
import { ArrowRightCircle } from 'lucide-react';
import { Link } from 'react-router';
import Loading from '../Reusable/Loading';
import { useTheme } from '../../contexts/ThemeContextProvider';
import PokemonStatTitle from '../PokemonDetails/PokemonBaseStats/PokemonStatTitle';
import type { Pokemon } from '../../types';
import PokemonImage from '../PokemonDetails/PokemonImage';
import { useTranslate } from '../../hooks/useTranslate';

const PokemonModalContent = ({
  loading,
  pokemon,
}: {
  loading: boolean;
  pokemon: Pokemon | null;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslate();
  const pokemonStats = pokemon?.stats.concat([
    { stat: { name: 'weight', url: '' }, effort: 0, base_stat: pokemon.weight },
    { stat: { name: 'height', url: '' }, effort: 0, base_stat: pokemon.height },
  ]);
  return (
    <>
      {loading ? (
        <div className='flex flex-1 h-full w-full items-center justify-center'>
          <Loading text='Loading Pokemons...' />
        </div>
      ) : (
        <>
          <Link
            className={`${
              isLight ? 'bg-cyan-800' : 'bg-cyan-600'
            } flex items-center gap-2 my-2 p-2 rounded-md font-semibold text-white w-fit cursor-pointer hover:bg-cyan-700`}
            to={`/pokemons/${pokemon?.id}`}
          >
            {t('pokemon_list_modal_link')} <ArrowRightCircle />
          </Link>
          <div className='flex flex-col md:flex-row w-full justify-between gap-2'>
            <div className='w-full  flex flex-col gap-2'>
              <PokemonImage
                string={
                  pokemon?.sprites.other['official-artwork']
                    .front_default as string
                }
              />
            </div>
            <div className='w-full flex flex-col gap-2'>
              <PokemonStatTitle
                name={pokemon?.name}
                xp={pokemon?.base_experience}
              />

              <PokemonStatCardWrapper
                items={pokemonStats}
                renderItem={(item, i) => {
                  return (
                    <PokemonStatCard
                      key={i}
                      statName={item.stat.name}
                      statValue={item.base_stat.toString()}
                    />
                  );
                }}
                title={t('pokemon_details_base_stats')}
              />

              <PokemonStatCardWrapper
                items={pokemon?.abilities}
                renderItem={(item, i) => {
                  return (
                    <PokemonStatDetailShort
                      key={i}
                      name={item.ability.name}
                    />
                  );
                }}
                title={t('pokemon_details_abilities_title')}
              />

              <PokemonStatCardWrapper
                items={pokemon?.types}
                renderItem={(item, i) => {
                  return (
                    <PokemonStatDetailShort
                      key={i}
                      name={item.type.name}
                    />
                  );
                }}
                title={t('pokemon_details_types_title')}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PokemonModalContent;
