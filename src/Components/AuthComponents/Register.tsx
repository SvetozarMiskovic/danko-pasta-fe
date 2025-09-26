import { useTheme } from '../../contexts/ThemeContextProvider';
import { useTranslate } from '../../hooks/useTranslate';
import RegisterForm from './RegisterForm';

const Register = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslate();
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
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
          {t('register_main')}
        </h3>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
