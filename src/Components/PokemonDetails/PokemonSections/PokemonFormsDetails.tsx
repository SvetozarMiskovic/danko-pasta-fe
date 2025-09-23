import type { PokemonForm } from '../../../types';
import { useTheme } from '../../../contexts/ThemeContextProvider';
import PokemonDetailIndex from './PokemonDetailIndex';
import { useTranslate } from '../../../hooks/useTranslate';

const PokemonFormsDetails = ({
  form,
  index,
}: {
  form: PokemonForm;
  index: number;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
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
            {form?.form_name
              ? t('pokemon_details_forms_name')
              : t('pokemon_details_forms_pokemon_name')}
          </h2>
          <h2 className='font-normal italic text-lg'>
            {form?.form_name.charAt(1).toUpperCase() +
              form?.form_name.slice(2) ||
              form?.name.charAt(1).toUpperCase() + form?.name.slice(2) ||
              t('unknown')}
          </h2>
        </div>
        <div>
          <h2
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_forms_battle_only')}
          </h2>
          <h2 className='font-normal italic text-lg'>
            {' '}
            {form?.is_battle_only ? 'Yes' : 'No'}
          </h2>
        </div>
        <div>
          <h2
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_forms_default_form')}
          </h2>
          <h2 className='font-normal italic text-lg'>
            {form?.is_default ? 'Yes' : 'No'}
          </h2>
        </div>
        <div>
          <h2
            className={`${
              isLight ? 'text-cyan-800' : 'text-cyan-600'
            } font-bold underline underline-offset-4 text-xl`}
          >
            {t('pokemon_details_forms_mega_form')}
          </h2>
          <h2 className='font-normal italic text-lg'>
            {form?.is_mega ? 'Yes' : 'No'}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PokemonFormsDetails;
