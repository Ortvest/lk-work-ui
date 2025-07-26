import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import IconChevron from '@shared/assets/icons/IconChevron.svg';

import './styles.css';

import { useLazyFetchAllEmployeesQuery } from '@global/api/employee/employee.api';
import { useLazyGetAllWorkCompaniesQuery } from '@global/api/work-company/work-company.api';
import { EmployeeTableTab } from '@shared/enums/general.enums';
import { UserRoles, UserWorkStatuses } from '@shared/enums/user.enums';
import { WorkCompanyEntity } from '@shared/interfaces/WorkCompanies.interfaces';

interface WorkCompanyFilterProps {
  selectedTable: EmployeeTableTab;
}
export const WorkCompanyFilter = ({ selectedTable }: WorkCompanyFilterProps): React.ReactNode => {
  const [fetchAllWorkCompanies] = useLazyGetAllWorkCompaniesQuery(undefined);
  const [fetchAllEmployees] = useLazyFetchAllEmployeesQuery(undefined);
  const user = useTypedSelector((state) => state.userReducer.user);
  const workCompanies = useTypedSelector((state) => state.workCompanyReducer.workCompanies);

  const [selected, setSelected] = useState<WorkCompanyEntity | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.role === UserRoles.SUPER_ADMIN) {
      fetchAllWorkCompanies(undefined);
    }
  }, [user]);

  useEffect(() => {
    if (workCompanies.length && !selected) {
      setSelected(workCompanies[0]);
    }
  }, [workCompanies]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (company: WorkCompanyEntity): void => {
    setSelected(company);
    setOpen(false);

    const companyName = company.name;

    if (selectedTable === 'fired') {
      fetchAllEmployees({
        company: companyName,
        workStatus: UserWorkStatuses.LAID_OFF,
        location: '',
      });
    } else {
      fetchAllEmployees({
        company: companyName,
        workStatus: UserWorkStatuses.WORKING,
        location: '',
      });
    }
  };

  const onShowAllEmployees = (): void => {
    setSelected(null);

    if (selectedTable === 'fired') {
      fetchAllEmployees({
        company: '',
        workStatus: UserWorkStatuses.LAID_OFF,
        location: '',
      });
    } else {
      fetchAllEmployees({
        company: '',
        workStatus: UserWorkStatuses.WORKING,
        location: '',
      });
    }
  };

  return (
    <div className="company-dropdown" ref={ref}>
      <div className="company-dropdown-header" onClick={() => setOpen((prev) => !prev)}>
        Employees at <span className="company-name">{selected?.name}</span>
        <img className={classNames('dropdown-icon', { open })} src={IconChevron} />
      </div>

      {open && (
        <div className="company-dropdown-list">
          {workCompanies.map((company) => (
            <div
              key={company.name}
              className={classNames('company-dropdown-item', {
                selected: selected?.name === company.name,
              })}
              onClick={() => handleSelect(company)}>
              Employees at {company.name}
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="company-address">
          {selected.address}{' '}
          <button onClick={onShowAllEmployees} className="see-all-btn">
            See All
          </button>
        </div>
      )}
    </div>
  );
};
