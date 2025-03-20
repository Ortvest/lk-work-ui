import { ReactNode } from 'react';

import classNames from 'classnames';

import './style.css';

interface SharedLabelProps {
  children: ReactNode;
  title: string;
}

export const SharedLabel = ({ children, title }: SharedLabelProps): JSX.Element => {
  return (
    <label className={classNames('shared-label')}>
      {title}
      {children}
    </label>
  );
};
