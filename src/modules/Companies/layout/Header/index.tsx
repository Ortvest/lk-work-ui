import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { AddCompanyPopupButton } from '@modules/Companies/feature/AddCompanyPopupButton';
import { FindCompanyField } from '@modules/Companies/feature/FindCompanyField';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';

interface AccommodationsTableHeaderProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}
export const CompaniesTableHeader = ({
  setIsOpenedModal,
  setOpenedPopupType,
}: AccommodationsTableHeaderProps): React.ReactNode => {
  const { t } = useTranslation('companies');
  return (
    <header className={classNames('employees-table-header-companies')}>
      <section className={classNames('employees-table-header-content')}>
        <div>
          <h1 className={classNames('employees-table-header-title')}>{t('companiesTitle')}</h1>
        </div>
      </section>
      <section className={classNames('employees-table-header-content responsive-comp')}>
        <div style={{ alignSelf: 'flex-end' }}>
          <AddCompanyPopupButton setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
        </div>
        <div className={classNames('employees-table-header-toolbar')}>
          <FindCompanyField />
        </div>
      </section>
    </header>
  );
};
