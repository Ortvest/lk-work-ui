import { useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constans';

import { SignInFormBody } from '@modules/SignIn/features/SignInFormBody';
import { SignInHeader } from '@modules/SignIn/layout/SignInHeader';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './style.css';

import { useAuthenticateUserMutation, useLazyGetMeQuery } from '@global/api/auth/auth.api';
import { UserDocumentsStatuses, UserRoles } from '@shared/enums/user.enums';
import { UserSignInData } from '@shared/interfaces/User.interfaces';

export const SignIn = (): JSX.Element => {
  const methods = useForm<UserSignInData>();
  const navigate = useNavigate();
  const [signIn] = useAuthenticateUserMutation();
  const [getUserData] = useLazyGetMeQuery();
  const { user } = useTypedSelector((state) => state.userReducer);

  const onSubmitHanlder = async (data: UserSignInData): Promise<void> => {
    try {
      await signIn(data);
      await getUserData();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case UserRoles.SUPER_ADMIN:
        navigate(AppRoutes.EMPLOYEES_TABLE.path);
        break;
      case UserRoles.MANAGER:
        navigate(AppRoutes.EMPLOYEES_TABLE.path);
        break;
      case UserRoles.EMPLOYEE:
        if (user.documentStatus === UserDocumentsStatuses.WAITING_FOR_BRIEFING) {
          navigate(AppRoutes.QUESTIONNAIRE.path);
        } else {
          navigate(AppRoutes.PERSONAL_INFO.path);
        }
        break;
      default:
        navigate(AppRoutes.SIGN_IN.path);
    }
  }, [user, navigate]);

  return (
    <FormProvider {...methods}>
      <main className={classNames('sign-in-container')}>
        <section className={classNames('sign-in-wrapper')}>
          <SignInHeader />
          <form className={classNames('sign-in-form')} onSubmit={methods.handleSubmit(onSubmitHanlder)}>
            <SignInFormBody />
          </form>
        </section>
      </main>
    </FormProvider>
  );
};
