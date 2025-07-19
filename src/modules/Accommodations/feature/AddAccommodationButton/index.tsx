import React from 'react';

import classNames from 'classnames';

import './style.css';

export const AddAccommodationButton = (): React.ReactNode => {
  return <button className={classNames('add-employee-button')}>Create Accommodation</button>;
};
