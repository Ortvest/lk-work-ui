import { ReactNode } from 'react';

import classNames from 'classnames';

interface SidebarWrapperProps {
  children: ReactNode;
}

export const SidebarWrapper = ({ children }: SidebarWrapperProps): JSX.Element => {
  return <div className={classNames('sidebar-wrapper')}>{children}</div>;
};
