import React, { useState } from 'react';
import AppInput from '../Reusable/AppInput';
import { CircleDashed } from 'lucide-react';
import { LINK_CONSTANTS, URL_CONSTANTS } from '../../constants';
import { Link, useNavigate } from 'react-router';
import { useTranslate } from '../../hooks/useTranslate';
import { loginSchema } from '../../schemas/login.schema';
import { useAuth } from '../../contexts/AuthContextProvider';
import { ZodError } from 'zod';

const LoginForm = () => {
  const { t } = useTranslate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [submiting, setSubmiting] = useState(false);
  const isDisabled = submiting || !formData.email || !formData.password;
  const { login } = useAuth();
  const navigate = useNavigate();
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
      navigate(LINK_CONSTANTS.HOME);
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

  return (
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
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <AppInput
        label={t('password')}
        error={errors.password}
        placeholder={t('password')}
        type='password'
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
        to={URL_CONSTANTS.AUTH.REGISTER}
        className='text-blue-500 hover:underline mt-4'
      >
        {t('no_acc_register')}
      </Link>
    </form>
  );
};

export default LoginForm;
