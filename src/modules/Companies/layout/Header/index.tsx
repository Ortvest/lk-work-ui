import React from 'react';

import classNames from 'classnames';

import { AddCompanyPopupButton } from '@modules/Companies/feature/AddCompanyPopupButton';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';
import { useTranslation } from "react-i18next";

interface AccommodationsTableHeaderProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}
export const CompaniesTableHeader = ({
  setIsOpenedModal,
  setOpenedPopupType,
}: AccommodationsTableHeaderProps): React.ReactNode => {
  const {t} = useTranslation('companies');
  return (
    <header className={classNames('employees-table-header')}>
      <section className={classNames('employees-table-header-content')}>
        <div>
          <h1 className={classNames('employees-table-header-title')}>{t("companiesTitle")}</h1>
        </div>
      </section>
      <section className={classNames('employees-table-header-content')}>
        <div style={{ alignSelf: 'flex-end' }}>
          <AddCompanyPopupButton setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
        </div>
      </section>
    </header>
  );
};
