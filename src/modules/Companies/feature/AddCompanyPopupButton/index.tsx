import React, { Fragment } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import IconPlus from '@shared/assets/icons/IconPlus.svg';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';
import { UserRoles } from '@shared/enums/user.enums';
import { useTranslation } from "react-i18next";

interface AddCompanyPopupButtonProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}

export const AddCompanyPopupButton = ({
  setIsOpenedModal,
  setOpenedPopupType,
}: AddCompanyPopupButtonProps): React.ReactNode => {
  const {t} = useTranslation('companies');
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const onOpenPopup = (): void => {
    setIsOpenedModal(true);
    setOpenedPopupType('create');
  };
  return (
    <Fragment>
      {userRole !== UserRoles.ACCOUNTANT ? (
        <button onClick={onOpenPopup} className={classNames('add-employee-popup-button')}>
          <img src={IconPlus} alt="IconPlus" />
          <span>{t("btnAddCompany")}</span>
        </button>
      ) : null}
    </Fragment>
  );
};
