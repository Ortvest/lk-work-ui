import { Fragment } from 'react';

import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

export const DocumentsNumberField = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <Fragment>
      <SharedLabel title="Passport Number:*">
        <SharedInput type="number" {...register('passportNumber')} placeholder="Enter your passport number..." />
      </SharedLabel>
      <SharedLabel title="PESEL Number:*">
        <SharedInput
          type="number"
          maxLength={11}
          {...register('peselNumber')}
          placeholder="Enter your pesel number..."
        />
      </SharedLabel>
    </Fragment>
  );
};
