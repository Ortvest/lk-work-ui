import React from 'react';

import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import './style.css';

interface AdminSidebarItemProps {
  icon: string;
  selectedIcon: string;
  label: string;
  path: string;
}
export const AdminSidebarItem = ({ icon, label, path, selectedIcon }: AdminSidebarItemProps): React.ReactNode => {
  const location = useLocation();
  const isCurrentPage = location.pathname.replace('/', '') === path;

  console.log(path, 'path');
  console.log(location, 'location');
  return (
    <div className={classNames('admin-sidebar-item', { active: isCurrentPage })}>
      <img src={isCurrentPage ? selectedIcon : icon} alt={label} />
    </div>
  );
};
