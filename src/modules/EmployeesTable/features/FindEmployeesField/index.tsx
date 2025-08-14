import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import IconSearch from '@shared/assets/icons/IconSearch.svg';

import './style.css';

import { useLazyFetchAllEmployeesQuery } from '@global/api/employee/employee.api';
import { EmployeeTableTab } from '@shared/enums/general.enums';
import { UserWorkStatuses } from '@shared/enums/user.enums';

interface FindEmployeesFieldProps {
  selectedTable: EmployeeTableTab;
}

export const FindEmployeesField = ({ selectedTable }: FindEmployeesFieldProps): React.ReactNode => {
  const [triggerSearch] = useLazyFetchAllEmployeesQuery();
  const [query, setQuery] = useState('');
  const [debounced] = useDebounce(query.trim(), 400);

  const [searchParams] = useSearchParams();
  const company = (searchParams.get('company') || '').trim();

  useEffect(() => {
    const payload = {
      fullName: debounced,
      company,
      workStatus: selectedTable === 'hired' ? UserWorkStatuses.WORKING : UserWorkStatuses.LAID_OFF,
    };

    if (debounced.length === 0 || debounced.length >= 2) {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (async () => {
        await triggerSearch(payload);
      })();
    }
  }, [debounced, company, selectedTable, triggerSearch]);

  return (
    <div className="search-field">
      <img src={IconSearch} alt="Search" className="search-icon" />
      <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" className="search-input" />
    </div>
  );
};
