import { ReactNode } from 'react';

import classNames from 'classnames';

import './style.css';

interface HeaderWrapperProps {
  children: ReactNode;
}

export const HeaderWrapper = ({ children }: HeaderWrapperProps): JSX.Element => {
  return <div className={classNames('header-wrapper')}>{children}</div>;
};
