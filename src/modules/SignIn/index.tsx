import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { SignInFormBody } from '@modules/SignIn/features/SignInFormBody';
import { SignInHeader } from '@modules/SignIn/layout/SignInHeader';

import './style.css';

import { useAuthenticateUserMutation } from '@global/api/auth/auth.api';
import { UserSignInData } from '@shared/interfaces/User.interfaces';

export const SignIn = (): JSX.Element => {
  const methods = useForm<UserSignInData>();

  const [signIn] = useAuthenticateUserMutation();
  const onSubmitHanlder = (data: UserSignInData): void => {
    signIn(data);
    console.log(data);
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
