import React from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constans';

import './style.css';

export const UserPreviewToolbar = (): React.ReactNode => {
  const navigate = useNavigate();

  const openSelectedEmployeeDetails = (): void => {
    navigate(AppRoutes.PERSONAL_INFO.path);
  };

  return (
    <section className={classNames('user-preview-toolbar')}>
      <button className={classNames('user-preview-toolbar-button')}>Cancel</button>
      <button className={classNames('user-preview-toolbar-button')} onClick={openSelectedEmployeeDetails}>
        See Details
      </button>
    </section>
  );
};
