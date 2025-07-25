import { useEffect, useState } from 'react';

import { AddEmployeePopup } from '@modules/EmployeesTable/layout/AddEmployeePopup';
import { EmployeeTableHeader } from '@modules/EmployeesTable/layout/Header';
import { EmployeesTableContent } from '@modules/EmployeesTable/layout/TableContent';
import { UserDocuments } from '@modules/EmployeesTable/layout/UserDocuments';
import { UserPreview } from '@modules/EmployeesTable/layout/UserPreview';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { Drawer } from '@shared/components/Drawer';

import {
  useLazyFetchAllEmployeesQuery,
  useLazyFetchVacationRequestsQuery
} from '@global/api/employee/employee.api';
import { EmployeeTableTab, EmployeeTableTabs } from '@shared/enums/general.enums';
import { UserRoles, UserWorkStatuses } from "@shared/enums/user.enums";
import { VacationFilters } from '@shared/enums/vacation.enums';
import { VacationRequestsResponse } from '@shared/interfaces/Vacation.interfaces';

import { WorkCompanyFilter } from "@modules/EmployeesTable/features/WorkCompanyFilter";

export const EmployeesTable = (): JSX.Element => {
  const user = useTypedSelector((state) => state.userReducer.user);
  const [fetchEmployees] = useLazyFetchAllEmployeesQuery();
  const [vacationType, setVacationType] = useState<EmployeeTableTab>(EmployeeTableTabs.VACATION_REQUESTS);

  const [fetchAllVacationRequests, { data }] = useLazyFetchVacationRequestsQuery();

  const { employees } = useTypedSelector((state) => state.employeeReducer);

  const [isUserPreviewDrawerOpen, setIsUserPreviewDrawerOpen] = useState(false);
  const [isUserDocumentsDrawerOpen, setIsUserDocumentsDrawerOpen] = useState(false);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<EmployeeTableTab>('hired');

  useEffect(() => {
    if (selectedTable === 'hired'){
      fetchEmployees({ location: user?.address.city, workStatus: UserWorkStatuses.WORKING, company: '' });
    } else {
      fetchEmployees({ location: user?.address.city, workStatus: UserWorkStatuses.LAID_OFF, company: '' });
    }
  }, [selectedTable]);

  useEffect(() => {
    if (vacationType === EmployeeTableTabs.VACATION_REQUESTS) {
      fetchAllVacationRequests(VacationFilters.VACATION_REQUESTS);
    } else {
      fetchAllVacationRequests(VacationFilters.ON_VACATION);
    }
  }, [vacationType]);


  return (
    <div style={{ width: '100%' }}>
      {
        user?.role === UserRoles.SUPER_ADMIN && <WorkCompanyFilter selectedTable={selectedTable}/>
      }
      <EmployeeTableHeader
        setSelectedTable={setSelectedTable}
        selectedTable={selectedTable}
        vacationRequestsNumber={data?.length}
        setIsOpenedModal={setIsOpenedModal}
        setVacationType={setVacationType}
      />
      <EmployeesTableContent
        selectedTable={selectedTable}
        setIsDrawerOpen={setIsUserPreviewDrawerOpen}
        employees={employees}
        vacationRequests={data as VacationRequestsResponse[]}
      />
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
