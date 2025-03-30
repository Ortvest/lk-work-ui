import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { UserSlice } from '@global/store/slices/User.slice';

import { SignInFormBody } from '@modules/SignIn/features/SignInFormBody';
import { SignInHeader } from '@modules/SignIn/layout/SignInHeader';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './style.css';

import { UserSignInData } from '@shared/interfaces/User.interfaces';

export const SignIn = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const { setUserAuthStatus } = UserSlice.actions;

  const methods = useForm<UserSignInData>();

  const onSubmitHanlder = (data: UserSignInData): void => {
    if (data.email && data.password) {
      dispatch(setUserAuthStatus(true));
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
