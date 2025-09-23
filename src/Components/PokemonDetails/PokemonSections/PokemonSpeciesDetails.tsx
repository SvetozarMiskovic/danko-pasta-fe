import type { PokemonSpecies } from '../../../types';
import { useTheme } from '../../../contexts/ThemeContextProvider';
import PokemonDetailIndex from './PokemonDetailIndex';
import { useTranslate } from '../../../hooks/useTranslate';

const PokemonSpeciesDetails = ({
  species,
  index,
}: {
  species: PokemonSpecies;
  index: number;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const name = species.names.find((name) => name.language.name === 'en');
  const genus = species.genera.find((genus) => genus.language.name === 'en');
  const { t } = useTranslate();
  return (
    <div className='flex gap-2 flex-col w-full'>
      <PokemonDetailIndex index={index} />

      <div
        className={`border ${
          isLight ? 'bg-white text-black' : 'bg-gray-800 text-white'
        } border-gray-400 p-2 rounded-md w-full flex flex-col gap-2`}
      >
        <div>
          <h2
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_species_name')}
          </h2>
          <h2 className='font-normal italic text-lg'>{name?.name}</h2>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <h3
              className={`${
                isLight ? 'text-cyan-800' : 'text-cyan-600'
              } font-bold underline underline-offset-4 text-xl`}
            >
              {t('pokemon_details_species_genus')}
            </h3>
            <h3 className='font-normal italic text-lg'>{genus?.genus}</h3>
          </div>
          <div className='flex flex-col gap-3'>
            <h3
              className={`${
                isLight ? 'text-cyan-800' : 'text-cyan-600'
              } font-bold underline underline-offset-4 text-xl`}
            >
              {t('pokemon_details_species_description_per_version')}
            </h3>
            <div className='flex flex-col gap-2'>
              {species.flavor_text_entries.map((entry, index) => {
                if (entry.language.name === 'en') {
                  return (
                    <div
                      className={`w-full border border-gray-400 rounded-md p-2 ${
                        isLight
                          ? 'bg-white text-black'
                          : 'bg-gray-600 text-white'
                      }`}
                      key={index}
                    >
                      <div>
                        <div className='flex items-center gap-2'>
                          <h2
                            className={`font-bold text-xl ${
                              isLight ? 'text-cyan-800' : 'text-cyan-600'
                            }`}
                          >
                            {t('pokemon_version')}
                          </h2>
                          <span
                            className={`italic text-lg ${
                              isLight ? 'text-gray-800' : 'text-gray-200'
                            }`}
                          >
                            {entry.version.name.charAt(0).toUpperCase() +
                              entry.version.name.slice(1)}
                          </span>
                        </div>
                        <h2>{entry.flavor_text.replace(/\n|\f/g, ' ')}</h2>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSpeciesDetails;
