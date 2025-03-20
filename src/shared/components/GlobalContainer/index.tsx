import { ReactNode } from 'react';

import classNames from 'classnames';

import './style.css';

interface GlobalWrapperProps {
  children: ReactNode;
}

export const GlobalContainer = ({ children }: GlobalWrapperProps): JSX.Element => {
  return (
    <div className={classNames('global-container')}>
      <div className={classNames('global-wrapper')}>{children}</div>
    </div>
  );
};
