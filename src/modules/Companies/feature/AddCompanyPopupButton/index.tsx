import React, { Fragment } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import IconPlus from '@shared/assets/icons/IconPlus.svg';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

interface AddCompanyPopupButtonProps {
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const AddCompanyPopupButton = ({ setIsOpenedModal }: AddCompanyPopupButtonProps): React.ReactNode => {
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const onOpenPopup = (): void => {
    setIsOpenedModal(true);
  };
  return (
    <Fragment>
      {userRole !== UserRoles.ACCOUNTANT ? (
        <button onClick={onOpenPopup} className={classNames('add-employee-popup-button')}>
          <img src={IconPlus} alt="IconPlus" />
          <span>Add Company</span>
        </button>
      ) : null}
    </Fragment>
  );
};
