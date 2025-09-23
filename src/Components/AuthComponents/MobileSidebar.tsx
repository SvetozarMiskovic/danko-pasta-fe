import { useEffect, useState } from 'react';
import ThemeToggle from '../Reusable/ThemeToggle';
import { useSidebar } from '../../contexts/SidebarProvider';
import { useTheme } from '../../contexts/ThemeContextProvider';
import { Link, useLocation } from 'react-router';
import Logout from './Logout';
import type { TranslationKeys } from '../../types';
import { useTranslate } from '../../hooks/useTranslate';
import LanguageSwitch from '../LanguageSwitch';
import { links } from '../../constants/links';

const MobileSidebar = () => {
  const { isOpen: open, closeSidebar } = useSidebar();
  const location = useLocation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslate();
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const updateHeight = () => setNavbarHeight(navbar.offsetHeight);
    updateHeight();
    window.addEventListener('resize', () => {
      updateHeight();

      if (window.innerWidth > 768) {
        closeSidebar();
      }
    });

    return () => window.removeEventListener('resize', updateHeight);
  }, [closeSidebar]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  return (
    <div
      style={{
        top: navbarHeight,
        height: `calc(100vh - ${navbarHeight}px)`,
      }}
      className={`border-l border-b justify-between z-50 fixed  w-76 ${
        isLight ? 'bg-white border-black' : 'bg-gray-800 border-white'
      } text-white flex flex-col gap-8 transform transition-all duration-500 ${
        open ? 'right-0 ' : '-right-76'
      }`}
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
    </div>
  );
};

export default MobileSidebar;
