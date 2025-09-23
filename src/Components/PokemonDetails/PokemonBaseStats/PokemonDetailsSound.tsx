import { useTheme } from '../../../contexts/ThemeContextProvider';
import { PlayCircle } from 'lucide-react';
import type { Cries, TranslationKeys } from '../../../types';
import { useTranslate } from '../../../hooks/useTranslate';

const PokemonDetailsSound = ({ cries }: { cries: Cries }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslate();
  function playSound(url: string) {
    const audio = new Audio(url);
    audio.play();
  }

  return (
    <div
      className={`border border-gray-400 rounded-md p-2 flex flex-col gap-2 ${
        isLight ? 'bg-white' : 'bg-gray-600'
      }`}
    >
      <h3
        className={`${
          isLight ? 'text-black' : 'text-white'
        } text-2xl font-semibold underline`}
      >
        {t('pokemon_details_cries_title')}
      </h3>
      <div className='flex gap-2 items-center'>
        {Object.entries(cries || {}).map(([key, value]) => {
          const string = ('pokemon_details_cries_title_' +
            key) as TranslationKeys;
          return (
            <div
              key={key}
              className={`p-2 w-full rounded-md flex justify-between items-center gap-2 text-xl ${
                isLight ? 'bg-cyan-800' : 'bg-cyan-600'
              }`}
            >
              <h3 className={`text-white font-bold`}>{t(string)}</h3>
              <button onClick={() => playSound(value)}>
                <PlayCircle
                  size={30}
                  className={`text-white cursor-pointer hover:text-green-400`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonDetailsSound;
