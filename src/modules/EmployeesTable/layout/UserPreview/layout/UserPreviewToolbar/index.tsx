import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constans';

import './style.css';

interface UserPreviewToolbarProps {
  setIsDrawerOpen: (isOpen: boolean) => void;
}

export const UserPreviewToolbar = ({ setIsDrawerOpen }: UserPreviewToolbarProps): React.ReactNode => {
  const { t } = useTranslation('employees-table');
  const navigate = useNavigate();

  const openSelectedEmployeeDetails = (): void => {
    navigate(AppRoutes.PERSONAL_INFO.path);
  };

  const onCloseDrawerHandler = (): void => {
    setIsDrawerOpen(false);
  };

  return (
    <section className={classNames('user-preview-toolbar')}>
      <button className={classNames('user-preview-toolbar-button')} onClick={onCloseDrawerHandler}>
        {t('modalCancelBtn')}
      </button>
      <button className={classNames('user-preview-toolbar-button')} onClick={openSelectedEmployeeDetails}>
        {t('cardSeeDetails')}
      </button>
    </section>
  );
};
