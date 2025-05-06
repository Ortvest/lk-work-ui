import { Fragment } from 'react';

import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

export const NameFields = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <Fragment>
      <SharedLabel title="First name:*">
        <SharedInput type="text" {...register('firstName')} placeholder="Enter your first name..." />
      </SharedLabel>
      <SharedLabel title="Last name:*">
        <SharedInput type="text" {...register('lastName')} placeholder="Enter your last name..." />
      </SharedLabel>
    </Fragment>
  );
};
