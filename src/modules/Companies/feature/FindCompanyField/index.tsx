import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import IconSearch from '@shared/assets/icons/IconSearch.svg';

import './style.css';

import { useLazySearchWorkCompanyQuery } from "@global/api/work-company/work-company.api";

export const FindCompanyField = (): React.ReactNode => {
  const { t } = useTranslation(['work-assets-table', 'employees-table']);

  const [triggerSearch] = useLazySearchWorkCompanyQuery();
  const [query, setQuery] = useState('');
  const [debounced] = useDebounce(query.trim(), 400);

  const [searchParams] = useSearchParams();
  const company = (searchParams.get('company') || '').trim();

  useEffect(() => {
    if (debounced.length === 0 || debounced.length >= 2) {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (async () => {
        await triggerSearch(debounced);
      })();
    }
  }, [debounced, company, triggerSearch]);

  return (
    <div className="search-field">
      <img src={IconSearch} alt="Search" className="search-icon" />
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={t('employees-table:search')}
        className="search-input"
      />
    </div>
  );
};
