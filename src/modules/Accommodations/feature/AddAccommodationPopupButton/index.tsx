import React from 'react';

import classNames from 'classnames';

import IconPlus from '@shared/assets/icons/IconPlus.svg';

import './style.css';

interface AddEmployeePopupButton {
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const AddAccommodationPopupButton = ({ setIsOpenedModal }: AddEmployeePopupButton): React.ReactNode => {
  const onOpenPopup = (): void => {
    setIsOpenedModal(true);
  };
  return (
    <button onClick={onOpenPopup} className={classNames('add-employee-popup-button')}>
      <img src={IconPlus} alt="IconPlus" />
      <span>Add Accommodation</span>
    </button>
  );
};
