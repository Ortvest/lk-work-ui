import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { UserSlice } from '@global/store/slices/User.slice';

import { SignInFormBody } from '@modules/SignIn/features/SignInFormBody';
import { SignInHeader } from '@modules/SignIn/layout/SignInHeader';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './style.css';

import { useAuthenticateUserMutation } from '@global/api/auth/auth.api';
import { UserSignInData } from '@shared/interfaces/User.interfaces';

export const SignIn = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const { setUserAuthStatus, setUserAdminStatus } = UserSlice.actions;

  const methods = useForm<UserSignInData>();

  const [signIn] = useAuthenticateUserMutation();
  const onSubmitHanlder = (data: UserSignInData): void => {
    signIn(data);
    console.log(data);

    const isAuth = false;
    const isAdmin = false;

    // if (data.email === 'admin@gmail.com' && data.password === '1111') {
    //   isAuth = true;
    //   isAdmin = true;
    // }
    //
    // if (data.email === 'user@gmail.com' && data.password === '1111') {
    //   isAuth = true;
    //   isAdmin = false;
    // }

    if (isAuth) {
      dispatch(setUserAuthStatus(true));
      dispatch(setUserAdminStatus(isAdmin));
      localStorage.setItem('authed', 'true');
      localStorage.setItem('isAdmin', String(isAdmin));
    }
  };

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
