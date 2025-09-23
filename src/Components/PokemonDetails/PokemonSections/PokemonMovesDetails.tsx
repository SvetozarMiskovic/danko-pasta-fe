import type { PokemonMoves } from '../../../types';
import { useTheme } from '../../../contexts/ThemeContextProvider';
import PokemonDetailIndex from './PokemonDetailIndex';
import { useTranslate } from '../../../hooks/useTranslate';

const PokemonMovesDetails = ({
  move,
  index,
}: {
  move: PokemonMoves;
  index: number;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const name = move.names.find((name) => name.language.name === 'en');
  const { t } = useTranslate();
  if (!move) return <div>nema nista</div>;
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
            {t('pokemon_details_moves_name')}
          </h2>
          <h2 className='font-normal italic text-lg'>{name?.name}</h2>
        </div>

        <div>
          <h3
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_moves_damage_class')}
          </h3>
          <h3 className='font-normal italic text-lg'>
            {move.damage_class.name || 'N/A'}
          </h3>
        </div>

        <div>
          <h3
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_moves_power')}
          </h3>
          <h3 className='font-normal italic text-lg'>{move.power || 'N/A'}</h3>
        </div>

        <div>
          <h3
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_moves_accuracy')}
          </h3>
          <h3 className='font-normal italic text-lg'>
            {move.accuracy || 'N/A'}
          </h3>
        </div>

        <div>
          <h3
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_moves_PP')}
          </h3>
          <h3 className='font-normal italic text-lg'>{move.pp || 'N/A'}</h3>
        </div>

        <div>
          <h3
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_moves_description')}
          </h3>
          <h3 className='font-normal italic text-lg'>
            {move.effect_entries
              .filter((entry) => entry.language.name === 'en')
              .map((entry) => entry.effect)
              .join(', ') || 'N/A'}
          </h3>
        </div>
        <div>
          <h3
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_moves_description_per_version')}
          </h3>
          <div className='flex flex-col w-full gap-2 font-normal italic text-lg py-2'>
            {move.flavor_text_entries.map((entry, index) => {
              if (entry.language.name === 'en') {
                return (
                  <div
                    className={`w-full border border-gray-400 rounded-md p-2 ${
                      isLight ? 'bg-white text-black' : 'bg-gray-600 text-white'
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
                          {entry.version_group.name.charAt(0).toUpperCase() +
                            entry.version_group.name.slice(1)}
                        </span>
                      </div>
                      <h2
                        className={`font-normal italic text-lg ${
                          isLight ? 'text-gray-800' : 'text-gray-200'
                        }`}
                      >
                        {entry.flavor_text.replace(/\n|\f/g, ' ')}
                      </h2>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonMovesDetails;
