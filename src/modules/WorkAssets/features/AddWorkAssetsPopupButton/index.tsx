import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import IconPlus from '@shared/assets/icons/IconPlus.svg';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';

interface AddWorkAssetsPopupButtonProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}

export const AddWorkAssetsPopupButton = ({
  setIsOpenedModal,
  setOpenedPopupType,
}: AddWorkAssetsPopupButtonProps): React.ReactNode => {
  const { t } = useTranslation('work-assets-table');
  const onOpenPopup = (): void => {
    setIsOpenedModal(true);
    setOpenedPopupType('create');
  };
  return (
    <button onClick={onOpenPopup} className={classNames('add-employee-popup-button')}>
      <img src={IconPlus} alt="IconPlus" />
      <span>{t('modalAddWorkAssetsBtn')}</span>
    </button>
  );
};
