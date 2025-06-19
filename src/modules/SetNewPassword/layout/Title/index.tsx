import React from 'react';

import classNames from 'classnames';

import './styles.css';

export const SetNewPasswordTitle = (): React.ReactNode => {
  return <h1 className={classNames('set-new-password-title')}>Change password</h1>;
};
