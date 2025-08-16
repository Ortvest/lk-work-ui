import React from 'react';

import classNames from 'classnames';

import './styles.css';
import { useTranslation } from "react-i18next";

export const SetNewPasswordTitle = (): React.ReactNode => {
  const { t } = useTranslation('reset-password');
  return <h1 className={classNames('set-new-password-title')}>{t("changePasswordTitle")}</h1>;
};
