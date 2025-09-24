import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContextProvider';
import { CircleDashed } from 'lucide-react';
import { LINK_CONSTANTS } from '../../constants';

const GuestComponent = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <CircleDashed className='animate-spin' />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={LINK_CONSTANTS.HOME}
        replace={true}
      />
    );
  }

  return <>{children}</>;
};

export default GuestComponent;
