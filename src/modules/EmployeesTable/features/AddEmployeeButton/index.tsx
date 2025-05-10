import React from 'react';

import classNames from 'classnames';

import './style.css';

export const AddEmployeeButton = (): React.ReactNode => {
  return <button className={classNames('add-employee-button')}>Add and Send Invite</button>;
};
