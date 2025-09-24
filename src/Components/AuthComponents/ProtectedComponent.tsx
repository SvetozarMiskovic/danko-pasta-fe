import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContextProvider';
import { URL_CONSTANTS } from '../../constants';
import Loading from '../Reusable/Loading';
import { useTranslate } from '../../hooks/useTranslate';

const ProtectedComponent = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { t } = useTranslate();

  if (isLoading) {
    return <Loading text={t('loading')} />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={URL_CONSTANTS.AUTH.LOGIN}
        replace={true}
      />
    );
  }
  return <>{children}</>;
};

export default ProtectedComponent;
