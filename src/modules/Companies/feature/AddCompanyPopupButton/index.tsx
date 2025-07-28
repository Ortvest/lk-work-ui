import React from 'react';

import classNames from 'classnames';

import IconPlus from '@shared/assets/icons/IconPlus.svg';

import './style.css';

interface AddCompanyPopupButton {
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const AddCompanyPopupButton = ({ setIsOpenedModal }: AddCompanyPopupButton): React.ReactNode => {
  const onOpenPopup = (): void => {
    setIsOpenedModal(true);
  };
  return (
    <button onClick={onOpenPopup} className={classNames('add-employee-popup-button')}>
      <img src={IconPlus} alt="IconPlus" />
      <span>Add Company</span>
    </button>
  );
};
