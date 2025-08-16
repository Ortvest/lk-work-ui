import React, { Fragment } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import IconPlus from '@shared/assets/icons/IconPlus.svg';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

interface AddEmployeePopupButton {
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const AddEmployeePopupButton = ({ setIsOpenedModal }: AddEmployeePopupButton): React.ReactNode => {
  const { t } = useTranslation('employees-table');
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const onOpenPopup = (): void => {
    setIsOpenedModal(true);
  };

  if (userRole === UserRoles.ACCOUNTANT) return null;

  return (
    <Fragment>
      <button
        onClick={onOpenPopup}
        className={classNames('add-employee-popup-button')}
        aria-label={t('addEmployeeBtn')}>
        <img src={IconPlus} alt="Plus" />
        <span>{t('addEmployeeBtn')}</span>
      </button>
    </Fragment>
  );
};
