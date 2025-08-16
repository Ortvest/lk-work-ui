import React from 'react';

import classNames from 'classnames';

import { SetNewPasswordForm } from '@modules/SetNewPassword/features/Form';
import { SetNewPasswordTitle } from '@modules/SetNewPassword/layout/Title';

import './styles.css';

export const SetNewPassword = (): React.ReactNode => {
  return (
    <div className={classNames('set-new-password-container')}>
      <SetNewPasswordTitle />
      <SetNewPasswordForm />
    </div>
  );
};
