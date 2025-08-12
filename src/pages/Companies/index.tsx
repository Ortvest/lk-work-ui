import React, { useState } from 'react';

import classNames from 'classnames';

import { AddCompanyPopup } from '@modules/Companies/layout/AddCompanyPopup';
import { CompaniesTable } from '@modules/Companies/layout/CompaniesTable';
import { EditCompanyPopup } from '@modules/Companies/layout/EditCompanyPopup';
import { CompaniesTableHeader } from '@modules/Companies/layout/Header';

import { useGetAllWorkCompaniesQuery } from '@global/api/work-company/work-company.api';
import { OpenedPopupType } from '@pages/Accommodations';

export const CompaniesPage = (): React.ReactNode => {
  // eslint-disable-next-line no-empty-pattern
  const { } = useGetAllWorkCompaniesQuery(undefined);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [openedPopupType, setOpenedPopupType] = useState<OpenedPopupType>(null);

  return (
    <div className={classNames('set-new-password-container')}>
      <CompaniesTableHeader setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
      <CompaniesTable setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
      {openedPopupType === 'create' ? (
        <AddCompanyPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
      ) : (
        <EditCompanyPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
      )}
    </div>
  );
};
