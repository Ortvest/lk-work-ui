import React, { useEffect, useState } from "react";

import classNames from 'classnames';

import { AccommodationsTable } from '@modules/Accommodations/layout/AccommodationsTable';
import { AddAccommodationPopup } from '@modules/Accommodations/layout/AddAccommodationPopup';
import { AccommodationsTableHeader } from '@modules/Accommodations/layout/Header';

import './styles.css';
import { EditAccommodationPopup } from '@modules/Accommodations/layout/EditAccommodationPopup';

export type OpenedPopupType = "create" | "edit" | null;
export const AccommodationsPage = (): React.ReactNode => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [openedPopupType, setOpenedPopupType] = useState<OpenedPopupType>(null);

  useEffect(() => {
    console.log(openedPopupType, 'type')
  }, [openedPopupType]);
  return (
    <div className={classNames('set-new-password-container')}>
      <AccommodationsTableHeader setIsOpenedModal={setIsOpenedModal} />
      <AccommodationsTable setOpenedPopupType={setOpenedPopupType}  setIsOpenedModal={setIsOpenedModal}/>
      {
        openedPopupType === 'create' ? <AddAccommodationPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} /> : <EditAccommodationPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
      }


    </div>
  );
};
