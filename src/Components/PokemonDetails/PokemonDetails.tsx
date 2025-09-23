import { useEffect } from 'react';
import { useParams } from 'react-router';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import { PokemonSection } from './PokemonSection';
import type {
  Ability,
  PokemonForm,
  PokemonMoves,
  PokemonSpecies,
  PokemonType,
} from '../../types';
import PokemonAbilityDetails from './PokemonSections/PokemonAbilityDetails';
import PokemonTypeDetails from './PokemonSections/PokemonTypeDetails';
import PokemonSpeciesDetails from './PokemonSections/PokemonSpeciesDetails';
import PokemonMovesDetails from './PokemonSections/PokemonMovesDetails';
import PokemonFormsDetails from './PokemonSections/PokemonFormsDetails';
import { useTheme } from '../../contexts/ThemeContextProvider';
import Loading from '../Reusable/Loading';
import PokemonStatCardWrapper from './PokemonBaseStats/PokemonStatCardWrapper';
import PokemonStatCard from './PokemonBaseStats/PokemonStatCard';
import PokemonStatTitle from './PokemonBaseStats/PokemonStatTitle';
import PokemonDetailsSound from './PokemonBaseStats/PokemonDetailsSound';
import PokemonImage from './PokemonImage';
import { useTranslate } from '../../hooks/useTranslate';

const PokemonDetails = () => {
  const { pokemonId } = useParams();
  const {
    pokemon,
    loading,
    fetchPokemonDetails,
    fetchSectionDetails,
    details,
    loadingDetails,
  } = usePokemonDetails();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  useEffect(() => {
    fetchPokemonDetails(Number(pokemonId));
  }, [pokemonId]);
  const pokemonStats = pokemon?.stats.concat([
    { stat: { name: 'weight', url: '' }, effort: 0, base_stat: pokemon.weight },
    { stat: { name: 'height', url: '' }, effort: 0, base_stat: pokemon.height },
  ]);
  const { t } = useTranslate();
  if (loading) {
    return <Loading text='Loading Pokemon Details' />;
  }

  if (pokemon)
    return (
      <div className='max-w-7xl w-full m-auto'>
        <div
          className={`w-full grid grid-cols-1 border h-full gap-2 border-gray-500 rounded-md p-3 ${
            isLight ? 'bg-white' : 'bg-gray-800'
          }`}
        >
          <div className='flex w-full flex-col md:flex-row justify-between gap-2'>
            <div className='w-full  flex flex-col gap-2'>
              <PokemonImage sprites={pokemon?.sprites} />
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
            </div>
          </div>

          <PokemonDetailsSound cries={pokemon?.cries} />
          <div className='flex gap-4 flex-col'>
            <PokemonSection<Ability>
              pokemonId={pokemonId!}
              details={details.abilities}
              items={pokemon.abilities.map((a) => a.ability)}
              loading={loadingDetails.abilities}
              onLoad={fetchSectionDetails}
              section='abilities'
              title={t('pokemon_details_abilities_title')}
              renderItem={(ability, index) => (
                <PokemonAbilityDetails
                  key={index}
                  ability={ability}
                  index={index}
                />
              )}
            />
            <PokemonSection<PokemonType>
              pokemonId={pokemonId!}
              details={details.types}
              items={pokemon.types.map((a) => a.type)}
              loading={loadingDetails.types}
              onLoad={fetchSectionDetails}
              section='types'
              title={t('pokemon_details_types_title')}
              renderItem={(type, index) => (
                <PokemonTypeDetails
                  key={index}
                  type={type}
                  index={index}
                />
              )}
            />
            <PokemonSection<PokemonForm>
              pokemonId={pokemonId!}
              details={details.forms}
              items={pokemon.forms}
              loading={loadingDetails.forms}
              onLoad={fetchSectionDetails}
              section='forms'
              title={t('pokemon_details_forms_title')}
              renderItem={(form, index) => (
                <PokemonFormsDetails
                  key={index}
                  form={form}
                  index={index}
                />
              )}
            />
            <PokemonSection<PokemonSpecies>
              pokemonId={pokemonId!}
              details={details.species}
              items={[pokemon.species]}
              loading={loadingDetails.species}
              onLoad={fetchSectionDetails}
              section='species'
              title={t('pokemon_details_species_title')}
              renderItem={(species, index) => (
                <PokemonSpeciesDetails
                  key={index}
                  species={species}
                  index={index}
                />
              )}
            />
            <PokemonSection<PokemonMoves>
              pokemonId={pokemonId!}
              details={details.moves}
              items={pokemon.moves.map((move) => move.move)}
              loading={loadingDetails.moves}
              onLoad={fetchSectionDetails}
              section='moves'
              title={t('pokemon_details_moves_title')}
              renderItem={(move, index) => (
                <PokemonMovesDetails
                  key={index}
                  index={index}
                  move={move}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
};

export default PokemonDetails;
