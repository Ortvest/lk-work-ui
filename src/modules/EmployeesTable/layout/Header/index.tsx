import React from 'react';

import classNames from 'classnames';

import { AddEmployeePopupButton } from '@modules/EmployeesTable/features/AddEmployeePopupButton';
import { FindEmployeesField } from '@modules/EmployeesTable/features/FindEmployeesField';
import { SwitchTableButton } from '@modules/EmployeesTable/features/SwitchTableButton';

import './style.css';

import { EmployeeTableTab, EmployeeTableTabs } from '@shared/enums/general.enums';


interface EmployeesTableProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  vacationRequestsNumber?: number;
  setSelectedTable: (selectedTable: EmployeeTableTab) => void;
  setVacationType: (selectedType: EmployeeTableTab) => void;
  selectedTable: EmployeeTableTab;
}
export const EmployeeTableHeader = ({
  setIsOpenedModal,
  vacationRequestsNumber,
  setSelectedTable,
  selectedTable,
  setVacationType,
}: EmployeesTableProps): React.ReactNode => {


  const hasSearchBar = selectedTable === EmployeeTableTabs.HIRED || selectedTable === EmployeeTableTabs.FIRED;
  return (
    <header className={classNames('employees-table-header')}>
      <section className={classNames('employees-table-header-content')}>
        <div>
          <h1 className={classNames('employees-table-header-title')}>Employees</h1>
        </div>
        <div>
          <SwitchTableButton
            setVacationType={setVacationType}
            setSelectedTable={setSelectedTable}
            text={'Hired'}
            isActive={selectedTable === EmployeeTableTabs.HIRED}
          />
          <SwitchTableButton
            setVacationType={setVacationType}
            setSelectedTable={setSelectedTable}
            text={'Fired'}
            isActive={selectedTable === EmployeeTableTabs.FIRED}
          />
          <SwitchTableButton
            setVacationType={setVacationType}
            setSelectedTable={setSelectedTable}
            text={`Vacation requests ${vacationRequestsNumber || 0}`}
            isActive={selectedTable === EmployeeTableTabs.VACATION_REQUESTS}
          />
          <SwitchTableButton
            setVacationType={setVacationType}
            setSelectedTable={setSelectedTable}
            text={'On vacation'}
            isActive={selectedTable === EmployeeTableTabs.ON_VACATION}
          />
        </div>
      </section>
      <section className={classNames('employees-table-header-content')}>
        <div style={{ alignSelf: 'flex-end' }}>
          <AddEmployeePopupButton setIsOpenedModal={setIsOpenedModal} />
        </div>
        {hasSearchBar ? (
          <div className={classNames('employees-table-header-toolbar')}>
            <FindEmployeesField selectedTable={selectedTable} />
          </div>
        ) : null}
      </section>
    </header>
  );
};
