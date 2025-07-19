import React, { useState } from 'react';

import classNames from 'classnames';

import { AccommodationsTable } from '@modules/Accommodations/layout/AccommodationsTable';
import { AddAccommodationPopup } from '@modules/Accommodations/layout/AddAccommodationPopup';
import { AccommodationsTableHeader } from '@modules/Accommodations/layout/Header';

import './styles.css';

export const AccommodationsPage = (): React.ReactNode => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  return (
    <div className={classNames('set-new-password-container')}>
      <AccommodationsTableHeader setIsOpenedModal={setIsOpenedModal} />
      <AccommodationsTable />
      <AddAccommodationPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
    </div>
  );
};
