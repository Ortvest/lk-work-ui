import React from 'react';

import classNames from 'classnames';

import IconPlus from '@shared/assets/icons/IconPlus.svg';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';
import { useTranslation } from "react-i18next";

interface AddStuffPopupButtonProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}

export const AddStuffPopupButton = ({
  setIsOpenedModal,
  setOpenedPopupType,
}: AddStuffPopupButtonProps): React.ReactNode => {
  const {t} = useTranslation('employees-table');
  const onOpenPopup = (): void => {
    setIsOpenedModal(true);
    setOpenedPopupType('create');
  };
  return (
    <button onClick={onOpenPopup} className={classNames('add-employee-popup-button')}>
      <img src={IconPlus} alt="IconPlus" />
      <span>{t("modalAddStuffBtn")}</span>
    </button>
  );
};
