import React, { useState } from 'react';

import classNames from 'classnames';

import { AddEmployeePopupButton } from '@modules/EmployeesTable/features/AddEmployeePopupButton';
import { FilterEmployeesButton } from '@modules/EmployeesTable/features/FilterEmployeesButton';
import { FindEmployeesField } from '@modules/EmployeesTable/features/FindEmployeesField';
import { SwitchTableButton } from '@modules/EmployeesTable/features/SwitchTableButton';

import './style.css';

interface EmployeesTableProps {
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const EmployeeTableHeader = ({ setIsOpenedModal }: EmployeesTableProps): React.ReactNode => {
  const [selectedTable, setSelectedTable] = useState<'hired' | 'fired'>('hired');

  return (
    <header className={classNames('employees-table-header')}>
      <section className={classNames('employees-table-header-content')}>
        <div>
          <h1 className={classNames('employees-table-header-title')}>Employees</h1>
        </div>
        <div>
          <SwitchTableButton setSelectedTable={setSelectedTable} text={'Hired'} isActive={selectedTable === 'hired'} />
          <SwitchTableButton setSelectedTable={setSelectedTable} text={'Fired'} isActive={selectedTable === 'fired'} />
        </div>
      </section>
      <section className={classNames('employees-table-header-content')}>
        <div style={{ alignSelf: 'flex-end' }}>
          <AddEmployeePopupButton setIsOpenedModal={setIsOpenedModal} />
        </div>
        <div className={classNames('employees-table-header-toolbar')}>
          <FindEmployeesField />
          <FilterEmployeesButton />
        </div>
      </section>
    </header>
  );
};
