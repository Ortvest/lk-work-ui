import React from 'react';

import IconSearch from '@shared/assets/icons/IconSearch.svg';

import './style.css';

export const FindEmployeesField = (): React.ReactNode => {
  return (
    <div className="search-field">
      <img src={IconSearch} alt="Search" className="search-icon" />
      <input type="text" placeholder="Search" className="search-input" />
    </div>
  );
};
