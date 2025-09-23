import type { Ability } from '../../../types';
import { useTheme } from '../../../contexts/ThemeContextProvider';
import PokemonDetailIndex from './PokemonDetailIndex';
import { useTranslate } from '../../../hooks/useTranslate';

const PokemonAbilityDetails = ({
  ability,
  index,
}: {
  ability: Ability;
  index: number;
}) => {
  const { theme } = useTheme();
  const { t } = useTranslate();
  const isLight = theme === 'light';
  const entry = ability.effect_entries.find((ee) => ee.language.name === 'en');
  const name = ability.names.find((name) => name.language.name === 'en');

  return (
    <div
      className={`flex gap-2 flex-col w-full ${
        isLight ? 'text-black' : 'text-white'
      }`}
    >
      <PokemonDetailIndex index={index} />

      <div
        className={`border border-gray-400 p-2 rounded-md w-full flex flex-col gap-2 ${
          isLight ? 'bg-white' : 'bg-gray-800'
        }`}
      >
        <div>
          <h2
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_abilities_name')}
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
              {t('pokemon_details_abilities_description')}
            </h3>
            <h3 className='font-normal italic text-lg'>{entry?.effect}</h3>
          </div>
          <div>
            <h3
              className={`${
                isLight ? 'text-cyan-800' : 'text-cyan-600'
              } font-bold underline underline-offset-4 text-xl`}
            >
              {t('pokemon_details_abilities_short_description')}
            </h3>
            <h3 className='font-normal italic text-lg'>
              {entry?.short_effect}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonAbilityDetails;
