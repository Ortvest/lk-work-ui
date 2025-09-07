import { ReactNode } from 'react';

import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constans';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './style.css';

interface SharedLabelProps {
  children: ReactNode;
  title: string;
}

export const SharedLabel = ({ children, title }: SharedLabelProps): JSX.Element => {
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const location = useLocation();

  return (
    <label
      className={classNames('shared-label', {
        'edit-mode-off': !isEditModeEnabled && location.pathname !== AppRoutes.SIGN_IN.path,
      })}>
      {title}
      {children}
    </label>
  );
};
