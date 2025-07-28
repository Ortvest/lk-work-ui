import React, { useState } from 'react';

import classNames from 'classnames';

import { AddCompanyPopup } from '@modules/Companies/layout/AddCompanyPopup';
import { CompaniesTable } from '@modules/Companies/layout/CompaniesTable';
import { EditCompanyPopup } from '@modules/Companies/layout/EditCompanyPopup';
import { CompaniesTableHeader } from '@modules/Companies/layout/Header';

import { useGetAllWorkCompaniesQuery } from '@global/api/work-company/work-company.api';
import { OpenedPopupType } from '@pages/Accommodations';

export const CompaniesPage = (): React.ReactNode => {
  const { data } = useGetAllWorkCompaniesQuery(undefined);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [openedPopupType, setOpenedPopupType] = useState<OpenedPopupType>(null);
  console.log(data, 'DATA');
  return (
    <div className={classNames('set-new-password-container')}>
      <CompaniesTableHeader setIsOpenedModal={setIsOpenedModal} />
      <CompaniesTable setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
      {openedPopupType === 'create' ? (
        <AddCompanyPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
      ) : (
        <EditCompanyPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
      )}
    </div>
  );
};
