import classNames from 'classnames';

import './style.css';

export const SignInHeader = (): JSX.Element => {
  return (
    <header className={classNames('sign-in-header')}>
      <h2 className={classNames('sign-in-title')}>Sign In</h2>
      <p className={classNames('sign-in-subtitle')}>
        You can start using the system`s features after logging in. You should have received your credentials in your
        email.
      </p>
    </header>
  );
};
