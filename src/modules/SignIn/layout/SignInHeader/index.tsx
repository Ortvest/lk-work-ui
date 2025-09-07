import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import './style.css';

export const SignInHeader = (): JSX.Element => {
  const { t } = useTranslation('login');
  return (
    <header className={classNames('sign-in-header')}>
      <h2 className={classNames('sign-in-title')}>{t('signInTitle')}</h2>
      <p className={classNames('sign-in-subtitle')}>{t('signInSubTitle')}</p>
    </header>
  );
};
