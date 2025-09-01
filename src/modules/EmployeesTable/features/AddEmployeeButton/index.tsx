import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import './style.css';

export const AddEmployeeButton = (): React.ReactNode => {
  const { t } = useTranslation('employees-table');
  return <button className={classNames('add-employee-button')}>{t('modalAddAndSendInviteBtn')}</button>;
};
