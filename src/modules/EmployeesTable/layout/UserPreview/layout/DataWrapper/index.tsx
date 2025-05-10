import React from 'react';

import classNames from 'classnames';

import './style.css';

interface DataWrapperProps {
  children: React.ReactNode;
  isFirstChild?: boolean;
}
export const DataWrapper = ({ children, isFirstChild }: DataWrapperProps): React.ReactNode => {
  return <section className={classNames('data-wrapper-container', { 'is-first': isFirstChild })}>{children}</section>;
};
