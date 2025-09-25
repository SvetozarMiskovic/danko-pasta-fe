import React, { useState } from 'react';
import AppInput from '../Reusable/AppInput';
import { Link, useNavigate } from 'react-router';
import { LINK_CONSTANTS, URL_CONSTANTS } from '../../constants';
import { CircleDashed } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useTranslate } from '../../hooks/useTranslate';
import { registerSchema } from '../../schemas/register.schema';
import { ZodError } from 'zod';

const RegisterForm = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const { t } = useTranslate();

  const [formData, setFormData] = React.useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const clearForm = () => {
    setFormData({
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    });
  };

  const clearErrors = () => {
    setErrors({
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmiting(true);
    e.preventDefault();
    clearErrors();
    try {
      const parsedData = await registerSchema.parseAsync(formData);

      const regRes = await register({
        email: parsedData.email,
        password: parsedData.password,
        name: parsedData.name,
      });
      if (regRes.success) {
        await login({ email: parsedData.email, password: parsedData.password });
        clearForm();
        navigate(LINK_CONSTANTS.HOME);
      }
      setIsSubmiting(false);
    } catch (err) {
      setIsSubmiting(false);

      if (err instanceof ZodError) {
        const newErrors = {
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
        };


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

  const isDisabled =
    isSubmiting ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword;

  return (
    <form
      className='flex flex-col items-center gap-2'
      onSubmit={handleSubmit}
    >
      <AppInput
        error={errors.email}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        label={t('email')}
        type='text'
        placeholder={t('email')}
        required
      />
      <AppInput
        error={errors.name}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        label={t('name')}
        type='text'
        placeholder={t('name')}
      />
      <AppInput
        error={errors.password}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        label={t('password')}
        type='password'
        placeholder={t('password')}
        required
      />
      <AppInput
        error={errors.confirmPassword}
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        label={t('confirmPassword')}
        type='password'
        placeholder={t('confirmPassword')}
        required
      />

      <button
        type='submit'
        disabled={isDisabled}
        className={`${
          isDisabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'
        } flex items-center justify-center gap-2 w-full text-white cursor-pointer px-4 py-2 rounded`}
      >
        {t('registerMain')}{' '}
        {isSubmiting && <CircleDashed className='animate-spin' />}
      </button>
      <Link
        to={URL_CONSTANTS.AUTH.LOGIN}
        className='text-blue-500 hover:underline mt-4'
      >
        {t('have_acc_login')}
      </Link>
    </form>
  );
};

export default RegisterForm;
