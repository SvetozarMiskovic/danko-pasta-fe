import { useEffect, useState } from 'react';
import { useTranslate } from '../hooks/useTranslate';
import { useTheme } from '../contexts/ThemeContextProvider';
import { DE, RS, US } from 'country-flag-icons/react/3x2';
import { AnimatePresence, motion } from 'framer-motion';
import type { TranslationKeys } from '../types';

type Language = 'en' | 'de' | 'sr' | 'sr-Latn';

const lngs = [
  {
    code: 'en',
    label: 'English',
    Icon: US,
  },
  {
    code: 'de',
    label: 'Deutsch',
    Icon: DE,
  },
  {
    code: 'sr',
    label: 'Српски',
    Icon: RS,
  },
  {
    code: 'sr-Latn',
    label: 'Srpski',
    Icon: RS,
  },
];

const LanguageSwitch = () => {
  const [activeLng, setActiveLng] = useState<Language>(
    () => (localStorage.getItem('i18nextLng') as Language) || 'en'
  );
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { changeLanguage, t } = useTranslate();

  useEffect(() => {
    changeLanguage(activeLng);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [activeLng]);

  function updateLanguage(lang: Language) {
    setActiveLng(lang);
    changeLanguage(lang);
  }

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div
      onClick={() => toggleOpen()}
      id='menu-btn'
      className={` flex flex-col gap-2 p-2 w-full rounded-lg justify-center items-center ${
        isLight ? 'bg-gray-100 text-black' : 'bg-gray-600 text-white'
      }`}
    >
      <div className='flex items-center justify-center w-full cursor-pointer  rounded-md'>
        {lngs.map((lng) => {
          if (lng.code === activeLng)
            return (
              <div
                key={lng.code}
                className={`flex items-center text-lg lg:text-xl h-5 gap-3 `}
              >
                <h2>{lng.label}</h2>{' '}
                <div className='w-7 h-7 flex items-center '>
                  <lng.Icon />
                </div>
              </div>
            );
        })}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
            className={`p-2 w-full overflow-hidden flex flex-col gap-2 ${
              isLight ? 'bg-gray-300' : 'bg-gray-800 text-white'
            } rounded-md`}
          >
            {lngs.map((l) => {
              const isActive = l.code === activeLng;
              const string = ('language_' + l.code) as TranslationKeys;

              return (
                <div
                  key={l.code}
                  onClick={() => updateLanguage(l.code as Language)}
                  className={`flex min-h-8 gap-2 cursor-pointer items-center transition-colors duration-300 justify-center rounded-md ${
                    isLight
                      ? isActive
                        ? 'bg-gray-200 text-black'
                        : 'bg-white text-black hover:bg-gray-200'
                      : isActive
                      ? 'bg-gray-700 '
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  <h2>{t(string)}</h2>
                  <div className='flex items-center w-5 h-5'>
                    <l.Icon />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitch;
