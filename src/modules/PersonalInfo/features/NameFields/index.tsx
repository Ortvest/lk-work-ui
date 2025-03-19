import { Fragment } from 'react';

import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

export const NameFields = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <Fragment>
      <SharedLabel>
        First name:*
        <SharedInput type="text" {...register('firstName')} placeholder="Enter your first name..." />
      </SharedLabel>
      <SharedLabel>
        Last name:*
        <SharedInput type="text" {...register('lastName')} placeholder="Enter your last name..." />
      </SharedLabel>
    </Fragment>
  );
};
