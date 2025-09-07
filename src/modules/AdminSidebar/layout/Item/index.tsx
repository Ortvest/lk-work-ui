import React from 'react';

import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import './style.css';

interface AdminSidebarItemProps {
  icon: string;
  selectedIcon: string;
  label: string;
  path: string;
  onClick?: () => void;
}
export const AdminSidebarItem = ({ icon, label, path, selectedIcon }: AdminSidebarItemProps): React.ReactNode => {
  const location = useLocation();
  const isCurrentPage = location.pathname.replace('/', '') === path;

  return (
    <Link to={path} className={classNames('admin-sidebar-item', { active: isCurrentPage })}>
      <img src={isCurrentPage ? selectedIcon : icon} alt={label} />
    </Link>
  );
};
