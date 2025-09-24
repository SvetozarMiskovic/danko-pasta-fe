import { useTheme } from '../../contexts/ThemeContextProvider';
import { useTranslate } from '../../hooks/useTranslate';
import LoginForm from './LoginForm';

const Login = () => {
  const { t } = useTranslate();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        isLight ? 'bg-gray-100' : 'bg-gray-600'
      }`}
    >
      <div
        className={`${
          isLight ? 'bg-white' : 'bg-gray-800'
        } p-6 rounded shadow-md w-96`}
      >
        <h3
          className={`${
            isLight ? 'text-black' : 'text-white'
          } text-3xl text-center mb-4`}
        >
          {t('loginMain')}
        </h3>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
