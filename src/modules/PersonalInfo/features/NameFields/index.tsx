import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';

export const NameFields = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <Fragment>
      <label className={classNames('field-label')}>
        First name:*
        <SharedInput type="text" {...register('firstName')} placeholder="Enter your first name..." />
      </label>
      <label className={classNames('field-label')}>
        Last name:*
        <SharedInput type="text" {...register('lastName')} placeholder="Enter your last name..." />
      </label>
    </Fragment>
  );
};
