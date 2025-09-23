import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContextProvider';
import AppInput from '../Reusable/AppInput';
import { useState } from 'react';
import { loginSchema } from '../../schemas/login.schema';
import { ZodError } from 'zod';
import { CircleDashed } from 'lucide-react';
import { useToast } from '../../contexts/ToastProvider';
import { useTheme } from '../../contexts/ThemeContextProvider';
import { useTranslate } from '../../hooks/useTranslate';

const Login = () => {
  const { t } = useTranslate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [submiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  const isLight = theme === 'light';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const clearErrors = () => {
    setErrors({
      email: '',
      password: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmiting(true);
    e.preventDefault();
    clearErrors();
    try {
      const parsedData = await loginSchema.parseAsync(formData);
      await login({ email: parsedData.email, password: parsedData.password });

      setSubmiting(false);
      navigate('/');
    } catch (err) {
      setSubmiting(false);

      if (err instanceof ZodError) {
        const newErrors = {
          email: '',
          password: '',
        };
        console.log('Validation errors', err.issues);
        err.issues.forEach((issue) => {
          const field = issue.path[0] as keyof typeof newErrors;
          newErrors[field] = issue.message;
        });

        setErrors(newErrors);
      } else {
        console.error('Unexpected error', err);
      }
    }
  };

  const isDisabled = submiting || !formData.email || !formData.password;
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
        <form
          className='flex flex-col items-center gap-3'
          onSubmit={handleSubmit}
        >
          <AppInput
            label={t('email')}
            error={errors.email}
            placeholder={t('email')}
            type='text'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <AppInput
            label={t('password')}
            error={errors.password}
            placeholder={t('password')}
            type='password'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            disabled={isDisabled}
            type='submit'
            className={` ${
              isDisabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'
            } w-full text-white cursor-pointer px-4 py-2 rounded  flex justify-center items-center gap-2`}
          >
            {t('loginMain')}
            {submiting && <CircleDashed className='animate-spin' />}
          </button>
          <Link
            to='/register'
            className='text-blue-500 hover:underline mt-4'
          >
            {t('no_acc_register')}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
