import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { AddAccommodationPopupButton } from '@modules/Accommodations/feature/AddAccommodationPopupButton';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';

interface AccommodationsTableHeaderProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}
export const AccommodationsTableHeader = ({
  setIsOpenedModal,
  setOpenedPopupType,
}: AccommodationsTableHeaderProps): React.ReactNode => {
  const { t } = useTranslation('accommodations');
  return (
    <header className={classNames('employees-table-header')}>
      <section className={classNames('employees-table-header-content')}>
        <div>
          <h1 className={classNames('employees-table-header-title')}>{t('accommodationsTitle')}</h1>
        </div>
      </section>
      <section className={classNames('employees-table-header-content')}>
        <div style={{ alignSelf: 'flex-end' }}>
          <AddAccommodationPopupButton setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
        </div>
      </section>
    </header>
  );
};
