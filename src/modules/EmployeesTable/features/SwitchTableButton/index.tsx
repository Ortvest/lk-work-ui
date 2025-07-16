import React from 'react';

import classNames from 'classnames';

import './style.css';

import { EmployeeTableTab, EmployeeTableTabs } from '@shared/enums/general.enums';

interface SwitchTableButtonProps {
  text: string;
  isActive: boolean;
  setSelectedTable: (selectedTable: EmployeeTableTab) => void;
  setVacationType: (selectedType: EmployeeTableTab) => void;
}
export const SwitchTableButton = ({
  text,
  isActive,
  setSelectedTable,
  setVacationType,
}: SwitchTableButtonProps): React.ReactNode => {
  const onSetSelectedTable = (): void => {
    switch (text) {
      case 'Hired':
        setSelectedTable(EmployeeTableTabs.HIRED);
        break;
      case 'Fired':
        setSelectedTable(EmployeeTableTabs.FIRED);
        break;
      case 'On vacation':
        setSelectedTable(EmployeeTableTabs.ON_VACATION);
        setVacationType(EmployeeTableTabs.ON_VACATION);
        break;
      default:
        setSelectedTable(EmployeeTableTabs.VACATION_REQUESTS);
        setVacationType(EmployeeTableTabs.VACATION_REQUESTS);
    }
  };
  return (
    <button onClick={onSetSelectedTable} className={classNames('switch-table-button', { active: isActive })}>
      {text}
    </button>
  );
};
