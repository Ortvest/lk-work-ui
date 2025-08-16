import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@global/router/routes.constans';
import './style.css';
import { useTranslation } from 'react-i18next';

export const UserPreviewToolbar = (): React.ReactNode => {
  const { t } = useTranslation('employees-table');
  const navigate = useNavigate();

  const openSelectedEmployeeDetails = (): void => {
    navigate(AppRoutes.PERSONAL_INFO.path);
  };

  return (
    <section className={classNames('user-preview-toolbar')}>
      <button className={classNames('user-preview-toolbar-button')}>
        {t('modalCancelBtn')}
      </button>
      <button
        className={classNames('user-preview-toolbar-button')}
        onClick={openSelectedEmployeeDetails}
      >
        {t('cardSeeDetails')}
      </button>
    </section>
  );
};
