import React, { Fragment } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import IconPlus from '@shared/assets/icons/IconPlus.svg';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';
import { UserRoles } from '@shared/enums/user.enums';

interface AddEmployeePopupButton {
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}

export const AddAccommodationPopupButton = ({
  setIsOpenedModal,
  setOpenedPopupType,
}: AddEmployeePopupButton): React.ReactNode => {
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const onOpenPopup = (): void => {
    setOpenedPopupType('create');
    setIsOpenedModal(true);
  };
  return (
    <Fragment>
      {userRole !== UserRoles.ACCOUNTANT ? (
        <button onClick={onOpenPopup} className={classNames('add-employee-popup-button')}>
          <img src={IconPlus} alt="IconPlus" />
          <span>Add Accommodation</span>
        </button>
      ) : null}
    </Fragment>
  );
};
