import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import './styles.css';

export const SetNewPasswordTitle = (): React.ReactNode => {
  const { t } = useTranslation('reset-password');
  return <h1 className={classNames('set-new-password-title')}>{t('changePasswordTitle')}</h1>;
};
