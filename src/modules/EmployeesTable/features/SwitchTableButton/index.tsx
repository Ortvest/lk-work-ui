import React from 'react';
import classNames from 'classnames';
import './style.css';
import { EmployeeTableTab, EmployeeTableTabs } from '@shared/enums/general.enums';
import { useTranslation } from 'react-i18next';

interface SwitchTableButtonProps {
  translationKey: string;                 // ключ у JSON, напр. "hired", "fired", "onVacation", "vacationRequests"
  targetTab: EmployeeTableTab;            // яку вкладку вмикаємо при кліку
  isActive: boolean;
  setSelectedTable: (selectedTable: EmployeeTableTab) => void;
  setVacationType: (selectedType: EmployeeTableTab) => void;
  count?: number;                         // опційно — для "vacationRequests"
}

export const SwitchTableButton = ({
                                    translationKey,
                                    targetTab,
                                    isActive,
                                    setSelectedTable,
                                    setVacationType,
                                    count,
                                  }: SwitchTableButtonProps): React.ReactNode => {
  const { t } = useTranslation('employees-table');

  const onClick = (): void => {
    setSelectedTable(targetTab);
    if (targetTab === EmployeeTableTabs.ON_VACATION || targetTab === EmployeeTableTabs.VACATION_REQUESTS) {
      setVacationType(targetTab);
    }
  };

  return (
    <button onClick={onClick} className={classNames('switch-table-button', { active: isActive })}>
      {typeof count === 'number' ? t(translationKey, { count }) : t(translationKey)}
    </button>
  );
};
