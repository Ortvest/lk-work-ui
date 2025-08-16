import classNames from 'classnames';

import './style.css';
import { useTranslation } from "react-i18next";

export const SignInHeader = (): JSX.Element => {
  const { t } = useTranslation('login');
  return (
    <header className={classNames('sign-in-header')}>
      <h2 className={classNames('sign-in-title')}>{t('signInTitle')}</h2>
      <p className={classNames('sign-in-subtitle')}>
        {t('signInSubTitle')}
      </p>
    </header>
  );
};
