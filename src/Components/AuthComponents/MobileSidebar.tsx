import { useEffect } from 'react';
import ThemeToggle from '../Reusable/ThemeToggle';
import { useSidebar } from '../../contexts/SidebarProvider';
import { useTheme } from '../../contexts/ThemeContextProvider';
import { Link, useLocation } from 'react-router';
import Logout from './Logout';
import type { TranslationKeys } from '../../types';
import { useTranslate } from '../../hooks/useTranslate';
import LanguageSwitch from '../LanguageSwitch';
import { links } from '../../constants/links';
import { motion, AnimatePresence } from 'framer-motion';

const MobileSidebar = () => {
  const { isOpen: open, closeSidebar } = useSidebar();
  const location = useLocation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id='menu'
          initial={{
            opacity: 0,
            width: 0,
          }}
          animate={{
            opacity: 100,
            width: '100%',
          }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeSidebar();
            }
          }}
          className={`absolute right-0  max-w-72 z-50  ${
            isLight ? 'bg-white border-black' : 'bg-gray-800 border-white'
          }  ${open ? 'flex flex-col h-full' : 'hidden'}
      `}
        >
          <div className='flex flex-col'>
            <div className='p-2'>
              <LanguageSwitch />
            </div>
            <div className='duration-500'>
              <ul className='flex flex-col'>
                {links.map((link) => {
                  const string = 'nav_' + link.text;
                  return (
                    <Link
                      key={link.id}
                      className={`border-b ${
                        isLight ? 'border-black' : 'border-white'
                      } p-3 w-full ${
                        location.pathname === link.path
                          ? isLight
                            ? 'bg-gray-300 text-gray-500 underline'
                            : 'bg-gray-600 text-gray-400 underline'
                          : isLight
                          ? 'text-black hover:text-gray-400 hover:bg-gray-300'
                          : 'text-white hover:text-gray-200 hover:bg-gray-600'
                      }  `}
                      onClick={() => closeSidebar()}
                      to={link.path}
                    >
                      {t(string as TranslationKeys)}
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4 p-2'>
            <ThemeToggle className='self-center' />
            <Logout
              className='self-center w-full'
              cb={() => closeSidebar()}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
