import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContextProvider';
import { ArrowDown, ArrowUp } from 'lucide-react';
import ThemeToggle from './Reusable/ThemeToggle';
import Logout from './AuthComponents/Logout';
import LanguageSwitch from './LanguageSwitch';
import { useTheme } from '../contexts/ThemeContextProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslate } from '../hooks/useTranslate';

const Menu = () => {
  const [opened, setOpened] = useState(false);

  const { user } = useAuth();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslate();

  useEffect(() => {
    function openCloseMenu() {
      if (window.innerWidth < 768) {
        setOpened(false);
      }
    }
    window.addEventListener('resize', openCloseMenu);
    return () => window.removeEventListener('resize', openCloseMenu);
  }, []);

  return (
    <div className='relative w-1/3 z-10 hidden md:block'>
      <button
        id='menu'
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setOpened(false);
          }
        }}
        onClick={() => setOpened((prev) => !prev)}
        className={`p-2 font-semibold flex justify-center text-lg items-center gap-2 w-full ${
          isLight ? 'bg-gray-100 text-black' : 'bg-gray-600 text-white'
        } ${
          opened ? 'rounded-tr-md rounded-tl-md' : 'rounded-md'
        } border-cyan-600 border cursor-pointer  duration-300`}
      >
        {t('menu_user')} {user?.name}
        <span
          className={`duration-300 ${
            opened ? 'text-cyan-400' : 'text-cyan-600'
          }`}
        >
          {opened ? <ArrowUp /> : <ArrowDown />}
        </span>
      </button>

      <AnimatePresence>
        {opened && (
          <motion.div
            aria-hidden={!opened}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`p-2 ${
              opened ? 'flex' : 'hidden'
            } border-b border-r border-l border-cyan-600 absolute w-full overflow-hidden  flex-col gap-2 ${
              isLight ? 'bg-gray-300' : 'bg-gray-800'
            } `}
          >
            <div>
              <LanguageSwitch />
            </div>

            <div className='flex items-center justify-center gap-2'>
              <ThemeToggle className='hidden md:flex' />
            </div>
            <Logout className='hidden md:flex' />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
