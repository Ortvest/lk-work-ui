import { useEffect, useState } from 'react';

import { AddEmployeePopup } from '@modules/EmployeesTable/layout/AddEmployeePopup';
import { EmployeeTableHeader } from '@modules/EmployeesTable/layout/Header';
import { EmployeesTableContent } from '@modules/EmployeesTable/layout/TableContent';
import { UserDocuments } from '@modules/EmployeesTable/layout/UserDocuments';
import { UserPreview } from '@modules/EmployeesTable/layout/UserPreview';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { Drawer } from '@shared/components/Drawer';

import { useFetchAllEmployeesQuery } from '@global/api/employee/employee.api';

export const EmployeesTable = (): JSX.Element => {
  const { refetch } = useFetchAllEmployeesQuery();

  const { employees } = useTypedSelector((state) => state.employeeReducer);
  const [isUserPreviewDrawerOpen, setIsUserPreviewDrawerOpen] = useState(false);
  const [isUserDocumentsDrawerOpen, setIsUserDocumentsDrawerOpen] = useState(false);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <EmployeeTableHeader setIsOpenedModal={setIsOpenedModal} />
      <EmployeesTableContent setIsDrawerOpen={setIsUserPreviewDrawerOpen} employees={employees} />
      <AddEmployeePopup setIsOpenedModal={setIsOpenedModal} isOpen={isOpenedModal} />
      <Drawer
        containerExtraStyles={{ background: 'rgba(234, 234, 236, 1)' }}
        isOpen={isUserPreviewDrawerOpen}
        onClose={() => setIsUserPreviewDrawerOpen(false)}>
        <UserPreview
          setIsUserDocumentsDrawerOpen={setIsUserDocumentsDrawerOpen}
          setIsDrawerOpen={setIsUserPreviewDrawerOpen}
        />
      </Drawer>

      <Drawer
        containerExtraStyles={{ background: 'rgba(234, 234, 236, 1)' }}
        isOpen={isUserDocumentsDrawerOpen}
        onClose={() => setIsUserDocumentsDrawerOpen(false)}>
        <UserDocuments setIsUserDocumentsDrawerOpen={setIsUserDocumentsDrawerOpen} />
      </Drawer>
    </div>
  );
};
