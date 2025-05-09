import React from 'react';

import classNames from 'classnames';

import IconPlus from '@shared/assets/icons/IconPlus.svg';

import './style.css';

export const AddEmployeePopupButton = (): React.ReactNode => {
  return (
    <button className={classNames('add-employee-popup-button')}>
      <img src={IconPlus} alt="IconPlus" />
      <span>Add Employee</span>
    </button>
  );
};
