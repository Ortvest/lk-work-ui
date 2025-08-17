import { useEffect, useState } from 'react';

import { WorkCompanyFilter } from '@modules/EmployeesTable/features/WorkCompanyFilter';
import { AddEmployeePopup } from '@modules/EmployeesTable/layout/AddEmployeePopup';
import { EmployeeTableHeader } from '@modules/EmployeesTable/layout/Header';
import { EmployeesTableContent } from '@modules/EmployeesTable/layout/TableContent';
import { UserDocuments } from '@modules/EmployeesTable/layout/UserDocuments';
import { UserPreview } from '@modules/EmployeesTable/layout/UserPreview';
import { FireUser } from '@modules/EmployeesTable/layout/UserPreview/layout/FireUser';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { Drawer } from '@shared/components/Drawer';

import { useLazyFetchAllEmployeesQuery, useLazyFetchVacationRequestsQuery } from '@global/api/employee/employee.api';
import { EmployeeTableTab, EmployeeTableTabs } from '@shared/enums/general.enums';
import { UserRoles, UserWorkStatuses } from '@shared/enums/user.enums';
import { VacationFilters } from '@shared/enums/vacation.enums';
import { VacationRequestsResponse } from '@shared/interfaces/Vacation.interfaces';

export const EmployeesTable = (): JSX.Element => {
  const user = useTypedSelector((state) => state.userReducer.user);
  const [fetchEmployees] = useLazyFetchAllEmployeesQuery();
  const [vacationType, setVacationType] = useState<EmployeeTableTab>(EmployeeTableTabs.VACATION_REQUESTS);

  const [fetchAllVacationRequests, { data }] = useLazyFetchVacationRequestsQuery();

  const { employees } = useTypedSelector((state) => state.employeeReducer);

  const [isUserPreviewDrawerOpen, setIsUserPreviewDrawerOpen] = useState(false);
  const [isUserDocumentsDrawerOpen, setIsUserDocumentsDrawerOpen] = useState(false);
  const [isFireUserDrawerOpen, setIsFireUserDrawerOpen] = useState(false);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<EmployeeTableTab>('hired');
  const [vacationRequestsCount, setVacationRequestsCount] = useState(0);
  const selectedEmployee = useTypedSelector((state) => state.employeeReducer.selectedEmployee);
  useEffect(() => {
    fetchAllVacationRequests(VacationFilters.VACATION_REQUESTS).then((result) => {
      setVacationRequestsCount(result.data?.length || 0);
    });
  }, []);

  useEffect(() => {
    if (selectedTable === 'hired') {
      if (user?.role === UserRoles.SUPER_ADMIN) {
        (async (): Promise<void> => {
          await fetchEmployees({
            location: '',
            workStatus: UserWorkStatuses.WORKING,
            company: '',
            fullName: '',
          });
        })();
      } else {
        (async (): Promise<void> => {
          await fetchEmployees({
            location: '',
            workStatus: UserWorkStatuses.WORKING,
            company: user?.jobInfo.company,
            fullName: '',
          });
        })();
      }
    } else {
      if (user?.role === UserRoles.SUPER_ADMIN) {
        (async (): Promise<void> => {
          await fetchEmployees({
            location: '',
            workStatus: UserWorkStatuses.LAID_OFF,
            company: '',
            fullName: '',
          });
        })();
      } else {
        (async (): Promise<void> => {
          await fetchEmployees({
            location: '',
            workStatus: UserWorkStatuses.LAID_OFF,
            company: user?.jobInfo.company,
            fullName: '',
          });
        })();
      }
    }
  }, [selectedTable, user?.role]);

  useEffect(() => {
    if (vacationType === EmployeeTableTabs.VACATION_REQUESTS) {
      (async (): Promise<void> => {
        await fetchAllVacationRequests(VacationFilters.VACATION_REQUESTS);
      })();
    } else {
      (async (): Promise<void> => {
        await fetchAllVacationRequests(VacationFilters.ON_VACATION);
      })();
    }
  }, [vacationType]);

  return (
    <div style={{ width: '100%' }}>
      {user?.role === UserRoles.SUPER_ADMIN && <WorkCompanyFilter selectedTable={selectedTable} />}
      <EmployeeTableHeader
        setSelectedTable={setSelectedTable}
        selectedTable={selectedTable}
        vacationRequestsNumber={vacationRequestsCount}
        setIsOpenedModal={setIsOpenedModal}
        setVacationType={setVacationType}
      />
      <EmployeesTableContent
        selectedTable={selectedTable}
        setIsDrawerOpen={setIsUserPreviewDrawerOpen}
        employees={employees}
        vacationRequests={data as VacationRequestsResponse[]}
        setVacationRequestsCount={setVacationRequestsCount}
      />
      <AddEmployeePopup setIsOpenedModal={setIsOpenedModal} isOpen={isOpenedModal} />
      <Drawer
        containerExtraStyles={{ background: 'rgba(234, 234, 236, 1)' }}
        isOpen={isUserPreviewDrawerOpen}
        onClose={() => setIsUserPreviewDrawerOpen(false)}>
        <UserPreview
          setIsUserDocumentsDrawerOpen={setIsUserDocumentsDrawerOpen}
          setIsDrawerOpen={setIsUserPreviewDrawerOpen}
          setIsFireUserDrawerOpen={setIsFireUserDrawerOpen}
        />
      </Drawer>

      <Drawer
        containerExtraStyles={{ background: 'rgba(234, 234, 236, 1)' }}
        isOpen={isUserDocumentsDrawerOpen}
        onClose={() => setIsUserDocumentsDrawerOpen(false)}>
        <UserDocuments setIsUserDocumentsDrawerOpen={setIsUserDocumentsDrawerOpen} />
      </Drawer>

      <Drawer
        containerExtraStyles={{ background: 'rgba(234, 234, 236, 1)' }}
        width={460}
        isOpen={isFireUserDrawerOpen}
        onClose={() => setIsFireUserDrawerOpen(false)}>
        <FireUser selectedEmployee={selectedEmployee} setIsFireUserDrawerOpen={setIsFireUserDrawerOpen} />
      </Drawer>
    </div>
  );
};
