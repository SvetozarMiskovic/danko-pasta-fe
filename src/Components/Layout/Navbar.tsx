import { Link, useLocation } from 'react-router';
import { Bug, BugIcon, Home, LocateIcon } from 'lucide-react';
import en from '../../locales/en/translation.json';
import { useTheme } from '../../contexts/ThemeContextProvider';
import HamburgerIcon from '../Reusable/HamburgerIcon';
import Menu from '../Menu';
import { useTranslate } from '../../hooks/useTranslate';

export const links = [
  {
    id: 1,
    text: 'Home',
    path: '/',
    icon: Home,
  },
  {
    id: 2,
    text: 'Pokemons',
    path: '/pokemons',
    Icon: Bug,
  },
  {
    id: 3,
    text: 'Locations',
    path: '/pokemons/locations',
    icon: LocateIcon,
  },
];

const Navbar = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const isLight = theme === 'light';
  const { t } = useTranslate();

  return (
    <div
      id='navbar'
      className={`w-full p-2 translate-all duration-200 ease-in shadow-sm border-b border-gray-700 ${
        isLight ? 'bg-white' : 'bg-gray-800'
      }`}
    >
      <div className='border-none max-w-7xl place-self-center w-full py-4 gap-6 justify-between text-black  flex flex-row items-center'>
        <div>
          <h1
            className={`text-2xl font-extrabold flex gap-2 items-center ${
              isLight ? 'text-gray-950' : 'text-gray-100'
            }`}
          >
            {t('nav_header')} <BugIcon className='text-red-500' />{' '}
          </h1>
        </div>

        <div className='hidden md:block'>
          <ul className='flex items-center gap-5'>
            {links.map((link) => {
              const string = ('nav_' + link.text) as keyof typeof en;
              return (
                <li
                  key={link.id}
                  className={`font-bold text-lg  ${
                    location.pathname === link.path
                      ? isLight
                        ? 'text-gray-500 underline'
                        : 'text-gray-300 underline'
                      : isLight
                      ? 'text-gray-950'
                      : 'text-gray-100'
                  } hover:text-gray-500 hover:underline`}
                >
                  <Link to={link.path}>{t(string)}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Menu />
        <HamburgerIcon />
      </div>
    </div>
  );
};

export default Navbar;
