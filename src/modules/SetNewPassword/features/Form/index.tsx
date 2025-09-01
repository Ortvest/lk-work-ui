import React from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constans';

import { SharedButton } from '@shared/components/SharedButton';
import { SharedInput } from '@shared/components/SharedInput';

import './styles.css';

import { useSetNewPasswordMutation } from '@global/api/auth/auth.api';
import { NewPassword } from '@shared/interfaces/User.interfaces';

export const SetNewPasswordForm = (): React.ReactNode => {
  const { t } = useTranslation('reset-password');
  const { handleSubmit, register } = useForm<NewPassword>({});
  const [setNewPassword] = useSetNewPasswordMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = decodeURIComponent(searchParams.get('token') || '');
  const email = decodeURIComponent(searchParams.get('email') || '');

  const onSubmit = async (data: NewPassword): Promise<void> => {
    if (data.password === data.confirmPassword) {
      try {
        await setNewPassword({ password: data.password, email, token });
        toast.success('Password set successfully');
        navigate(AppRoutes.SIGN_IN.path);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong, please try again');
      }
    }
  };
  return (
    <form className={'set-new-password-form'} onSubmit={handleSubmit(onSubmit)}>
      <SharedInput
        style={{ fontSize: '16px', borderRadius: '8px' }}
        type="password"
        {...register('password')}
        placeholder={t('enterPasswordPlaceholder')}
      />
      <SharedInput
        style={{ fontSize: '16px', borderRadius: '8px' }}
        type="password"
        {...register('confirmPassword')}
        placeholder={t('reenterPasswordPlaceholder')}
      />
      <SharedButton
        sx={{ borderRadius: '8px', backgroundColor: 'rgba(47, 47, 47, 1)', height: '52px' }}
        type={'submit'}
        text={t('setPasswordButton')}
      />
    </form>
  );
};
