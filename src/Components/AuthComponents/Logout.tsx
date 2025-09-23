import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContextProvider';
import { CircleDashed } from 'lucide-react';
import { useTranslate } from '../../hooks/useTranslate';

const Logout = ({ className, cb }: { className?: string; cb?: () => void }) => {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { t } = useTranslate();

  return (
    <button
      className={`w-full active:bg-red-900 hover:bg-red-400 outline-none bg-red-500 flex items-center justify-center gap-2 text-white cursor-pointer px-4 py-1 rounded hover:bg-red-00 ${className}`}
      onClick={() => {
        setIsLoggingOut(true);
        setTimeout(() => {
          logout();
          setIsLoggingOut(false);
          cb && cb();
        }, 500);
      }}
    >
      {t('logout')} {isLoggingOut && <CircleDashed className='animate-spin' />}
    </button>
  );
};

export default Logout;
