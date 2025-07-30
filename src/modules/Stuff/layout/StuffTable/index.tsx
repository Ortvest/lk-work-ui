import { ReactNode } from 'react';

import { StuffTableContent } from '@modules/Stuff/layout/TableContent';

import { OpenedPopupType } from '@pages/Accommodations';
import { UserEntity } from '@shared/interfaces/User.interfaces';

interface StuffTableProps {
  setOpenedPopupType: (type: OpenedPopupType) => void;
  setIsOpenedModal: (isOpen: boolean) => void;
  employees: UserEntity[];
}
export const StuffTable = ({ setOpenedPopupType, setIsOpenedModal, employees }: StuffTableProps): ReactNode => {
  return (
    <>
      {employees ? (
        <StuffTableContent
          setOpenedPopupType={setOpenedPopupType}
          employees={employees}
          setIsDrawerOpen={setIsOpenedModal}
        /> )
        : null

      }
    </>
  );
};
