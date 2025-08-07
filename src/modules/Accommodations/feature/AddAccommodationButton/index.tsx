import React from 'react';

import classNames from 'classnames';

import './style.css';

interface AddAccommodationButtonProps {
  title: string;
}
export const AddAccommodationButton = ({ title }: AddAccommodationButtonProps): React.ReactNode => {
  return <button className={classNames('add-employee-button')}>{title}</button>;
};
