import React, {  useState } from 'react';

import classNames from 'classnames';

import { AddStuffPopup } from '@modules/Stuff/layout/AddStuffPopup';
import { EditStuffPopup } from '@modules/Stuff/layout/EditStuffPopup';
import { StuffTableHeader } from '@modules/Stuff/layout/Header';
import { StuffTableContent } from '@modules/Stuff/layout/TableContent';

import { useFetchAllEmployeesQuery } from '@global/api/employee/employee.api';
import { OpenedPopupType } from '@pages/Accommodations';
import { UserRoles, UserWorkStatuses } from '@shared/enums/user.enums';
import { UserEntity } from '@shared/interfaces/User.interfaces';

export const StuffPage = (): React.ReactNode => {
  const { data } = useFetchAllEmployeesQuery({
    workStatus: UserWorkStatuses.WORKING,
    roles: [UserRoles.OFFICE_WORKER, UserRoles.ACCOUNTANT],
    location: '',
    company: '',
  });
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [openedPopupType, setOpenedPopupType] = useState<OpenedPopupType>(null);

  return (
    <div className={classNames('set-new-password-container')}>
      <StuffTableHeader setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
      <StuffTableContent
        setOpenedPopupType={setOpenedPopupType}
        employees={(data || []) as unknown as UserEntity[]}
        setIsDrawerOpen={setIsOpenedModal}
      />
      {openedPopupType === 'create' ? (
        <AddStuffPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
      ) : (
        <EditStuffPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
      )}
    </div>
  );
};
