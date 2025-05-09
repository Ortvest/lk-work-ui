import { ReactNode } from 'react';

import classNames from 'classnames';

import './style.css';

interface GlobalWrapperProps {
  children: ReactNode;
}

export const AdminGlobalContainer = ({ children }: GlobalWrapperProps): JSX.Element => {
  return (
    <div className={classNames('admin-global-container')}>
      <div className={classNames('admin-global-wrapper')}>{children}</div>
    </div>
  );
};
