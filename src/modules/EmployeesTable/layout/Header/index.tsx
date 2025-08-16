import React from 'react';

import classNames from 'classnames';

import { AddEmployeePopupButton } from '@modules/EmployeesTable/features/AddEmployeePopupButton';
import { FindEmployeesField } from '@modules/EmployeesTable/features/FindEmployeesField';
import { SwitchTableButton } from '@modules/EmployeesTable/features/SwitchTableButton';

import './style.css';

import { EmployeeTableTab, EmployeeTableTabs } from '@shared/enums/general.enums';
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation('employees-table');

  return (
    <header className={classNames('employees-table-header')}>
      <section className={classNames('employees-table-header-content')}>
        <div>
          <h1 className={classNames('employees-table-header-title')}>{t("employeesTitle")}</h1>
        </div>
        <div>
          <SwitchTableButton
            translationKey="hired"
            targetTab={EmployeeTableTabs.HIRED}
            isActive={selectedTable === EmployeeTableTabs.HIRED}
            setSelectedTable={setSelectedTable}
            setVacationType={setVacationType}
          />
          <SwitchTableButton
            translationKey="fired"
            targetTab={EmployeeTableTabs.FIRED}
            isActive={selectedTable === EmployeeTableTabs.FIRED}
            setSelectedTable={setSelectedTable}
            setVacationType={setVacationType}
          />
          <SwitchTableButton
            translationKey="vacationRequests"
            targetTab={EmployeeTableTabs.VACATION_REQUESTS}
            isActive={selectedTable === EmployeeTableTabs.VACATION_REQUESTS}
            setSelectedTable={setSelectedTable}
            setVacationType={setVacationType}
            count={vacationRequestsNumber || 0}
          />
          <SwitchTableButton
            translationKey="onVacation"
            targetTab={EmployeeTableTabs.ON_VACATION}
            isActive={selectedTable === EmployeeTableTabs.ON_VACATION}
            setSelectedTable={setSelectedTable}
            setVacationType={setVacationType}
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
