import type { NavbarLinkType } from '../../constants/links';
import { Link, useLocation } from 'react-router';
import { useTheme } from '../../contexts/ThemeContextProvider';
import { useTranslate } from '../../hooks/useTranslate';
import type { TranslationKeys } from '../../types';

type NavbarLinkProps = {
  link: NavbarLinkType;
  string: string;
};
const NavbarLink = ({ link, string }: NavbarLinkProps) => {
  const location = useLocation();
  const { theme } = useTheme();
  const { t } = useTranslate();
  const isLight = theme === 'light';

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
      <Link to={link.path}>{t(string as TranslationKeys)}</Link>
    </li>
  );
};

export default NavbarLink;
