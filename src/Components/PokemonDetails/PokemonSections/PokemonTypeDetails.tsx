import type { PokemonType } from '../../../types';
import { useTheme } from '../../../contexts/ThemeContextProvider';
import PokemonDetailIndex from './PokemonDetailIndex';
import { useTranslate } from '../../../hooks/useTranslate';

const PokemonTypeDetails = ({
  type,
  index,
}: {
  type: PokemonType;
  index: number;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const name = type.names.find((name) => name.language.name === 'en');
  const { t } = useTranslate();
  const dd = Object.keys(type.damage_relations).map((key) => {
    const formatedKey =
      key.split('_')[0].charAt(0).toUpperCase() +
      key.split('_')[0].slice(1) +
      ' ' +
      key.split('_').slice(1).join(' ');
    return {
      key: formatedKey,
      value: type.damage_relations[key as keyof typeof type.damage_relations]
        .map((t) => t.name)
        .join(', '),
    };
  });

  return (
    <div
      className={`flex gap-2 flex-col w-full ${
        isLight ? 'text-black' : 'text-white'
      }`}
    >
      <PokemonDetailIndex index={index} />

      <div
        className={`border border-gray-400 ${
          isLight ? 'bg-white' : 'bg-gray-800'
        } p-2 rounded-md w-full flex flex-col gap-2`}
      >
        <div>
          <h2
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_types_name')}
          </h2>
          <h2 className='font-normal italic text-lg'>
            {' '}
            {name?.name || t('unknown')}
          </h2>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <h3
              className={`${
                isLight ? 'text-cyan-800' : 'text-cyan-600'
              } font-bold underline underline-offset-4 text-xl`}
            >
              {t('pokemon_details_types_damage_type')}
            </h3>
            <h3 className='font-normal italic text-lg'>
              {type.move_damage_class?.name.charAt(0).toUpperCase() +
                type.move_damage_class?.name.slice(1) || t('unknown')}
            </h3>
          </div>
          <div className='flex flex-col gap-1'>
            <h3
              className={`${
                isLight ? 'text-cyan-800' : 'text-cyan-600'
              } font-bold underline underline-offset-4 text-xl`}
            >
              {t('pokemon_details_types_damage_classification')}
            </h3>
            {dd.map((d, i) => (
              <div
                key={i}
                className='flex gap-1'
              >
                <h2
                  className={`${
                    isLight ? 'text-cyan-800' : 'text-cyan-600'
                  } font-semibold`}
                >
                  {d.key}
                </h2>
                <h2 className='font-normal italic'>[{d.value || 'none'}]</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonTypeDetails;
