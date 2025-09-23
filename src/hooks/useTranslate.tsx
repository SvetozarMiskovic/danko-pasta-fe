import { useTranslation } from 'react-i18next';

export const useTranslate = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return { t, changeLanguage, currentLang: i18n.language };
};
