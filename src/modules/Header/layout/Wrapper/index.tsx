import { ReactNode } from 'react';

import classNames from 'classnames';

import './style.css';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return <div className={classNames('header-wrapper')}>{children}</div>;
};
