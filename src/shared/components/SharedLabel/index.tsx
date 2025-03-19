import { ReactNode } from 'react';

import classNames from 'classnames';

import './style.css';

interface SharedLabelProps {
  children: ReactNode;
}

export const SharedLabel = ({ children }: SharedLabelProps): JSX.Element => {
  return <label className={classNames('shared-label')}>{children}</label>;
};
