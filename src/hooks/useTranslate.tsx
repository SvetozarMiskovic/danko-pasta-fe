import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useTranslate = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
    },
    [i18n]
  );

  return { t, changeLanguage, currentLang: i18n.language };
};
