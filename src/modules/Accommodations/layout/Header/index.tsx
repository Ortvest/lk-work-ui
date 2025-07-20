import React from 'react';

import classNames from 'classnames';

import { AddAccommodationPopupButton } from '@modules/Accommodations/feature/AddAccommodationPopupButton';

import './style.css';

interface AccommodationsTableHeaderProps {
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const AccommodationsTableHeader = ({ setIsOpenedModal }: AccommodationsTableHeaderProps): React.ReactNode => {
  return (
    <header className={classNames('employees-table-header')}>
      <section className={classNames('employees-table-header-content')}>
        <div>
          <h1 className={classNames('employees-table-header-title')}>Accommodations</h1>
        </div>
      </section>
      <section className={classNames('employees-table-header-content')}>
        <div style={{ alignSelf: 'flex-end' }}>
          <AddAccommodationPopupButton setIsOpenedModal={setIsOpenedModal} />
        </div>
      </section>
    </header>
  );
};
