import React from 'react';

import classNames from 'classnames';

import { AddStuffPopupButton } from '@modules/Stuff/features/AddStuffPopupButton';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';

interface StuffTableHeaderProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}
export const StuffTableHeader = ({ setIsOpenedModal, setOpenedPopupType }: StuffTableHeaderProps): React.ReactNode => {
  return (
    <header className={classNames('employees-table-header')}>
      <section className={classNames('employees-table-header-content')}>
        <div>
          <h1 className={classNames('employees-table-header-title')}>Stuff</h1>
        </div>
      </section>
      <section className={classNames('employees-table-header-content')}>
        <div style={{ alignSelf: 'flex-end' }}>
          <AddStuffPopupButton setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
        </div>
      </section>
    </header>
  );
};
