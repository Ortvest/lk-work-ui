import React from 'react';

import './style.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
  containerExtraStyles?: React.CSSProperties;
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
  width = 400,
  containerExtraStyles,
}: DrawerProps): React.ReactNode => {
  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}
      <div
        className={`drawer-panel ${isOpen ? 'drawer-open' : 'drawer-closed'}`}
        style={{ ...containerExtraStyles, width }}>
        {children}
      </div>
    </>
  );
};
