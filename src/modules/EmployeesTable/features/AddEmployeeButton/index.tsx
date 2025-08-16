import React from 'react';

import classNames from 'classnames';

import './style.css';
import { useTranslation } from "react-i18next";

export const AddEmployeeButton = (): React.ReactNode => {
  const { t } = useTranslation('employees-table');
  return <button className={classNames('add-employee-button')}>{t("modalAddAndSendInviteBtn")}</button>;
};
