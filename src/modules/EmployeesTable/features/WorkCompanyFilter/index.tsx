import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

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

  const { t } = useTranslation('employees-table');
  const [searchParams, setSearchParams] = useSearchParams();
  const hasCompanyParam = searchParams.has('company');
  const companyParamValue = (searchParams.get('company') ?? '').trim();

  useEffect(() => {
    if (user?.role === UserRoles.SUPER_ADMIN) {
      (async (): Promise<void> => {
        await fetchAllWorkCompanies(undefined);
      })()
    }
  }, [user, fetchAllWorkCompanies]);

  useEffect(() => {
    if (!workCompanies.length) return;

    if (hasCompanyParam) {
      if (companyParamValue) {
        const found = workCompanies.find((c) => c.name === companyParamValue) || null;
        setSelected(found);
      } else {
        setSelected(null);
      }
    } else if (!selected && user?.role !== UserRoles.SUPER_ADMIN) {
      const first = workCompanies[0];
      setSelected(first);
      const sp = new URLSearchParams(searchParams);
      sp.set('company', first.name);
      setSearchParams(sp, { replace: true });
    }
  }, [workCompanies, hasCompanyParam, companyParamValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const companyName = selected?.name || '';
    const workStatus = selectedTable === 'fired' ? UserWorkStatuses.LAID_OFF : UserWorkStatuses.WORKING;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (async () => {
      await fetchAllEmployees({
        company: companyName || "",
        workStatus,
        location: user?.address.city,
        fullName: ""
      });
    })();
  }, [selected, selectedTable, fetchAllEmployees]);

  const handleSelect = (company: WorkCompanyEntity): void => {
    setSelected(company);
    setOpen(false);
    const sp = new URLSearchParams(searchParams);
    sp.set('company', company.name);
    setSearchParams(sp);
  };

  const onShowAllEmployees = (): void => {
    setSelected(null);
    const sp = new URLSearchParams(searchParams);
    sp.set('company', '');
    setSearchParams(sp);
  };

  return (
    <div className="company-dropdown" ref={ref}>
      <div className="company-dropdown-header" onClick={() => setOpen((prev) => !prev)}>
        {t('employeesAt', { location: selected?.name || t('allCompanies') })}
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
              {t('employeesAt', { location: company.name })}
            </div>
          ))}
        </div>
      )}

      <div className="company-address">
        {selected ? (
          <>
            {selected.address}{' '}
            <button onClick={onShowAllEmployees} className="see-all-btn">
              {t('seeAll')}
            </button>
          </>
        ) : (
          t('showingAllCompanies')
        )}
      </div>
    </div>
  );
};
