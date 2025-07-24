import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

export const AddressSection = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <Fragment>
      <SharedSectionHeader title="Address" subtitle="Full Correspondence Address" />
      <fieldset className={classNames('questionnaire-address-fields-wrapper')}>
        <SharedLabel title="City:*">
          <SharedInput type="text" {...register('city')} placeholder="Enter City" />
        </SharedLabel>
        <SharedLabel title="Postal Code:*">
          <SharedInput type="text" {...register('postalCode')} placeholder="Enter Postal Code" />
        </SharedLabel>
        <SharedLabel title="Street:*">
          <SharedInput type="text" {...register('street')} placeholder="Enter Street" />
        </SharedLabel>
        <SharedLabel title="House Number:*">
          <SharedInput type="text" {...register('houseNumber')} placeholder="Enter House Number" />
        </SharedLabel>
        <SharedLabel title="Room Number:*">
          <SharedInput type="text" {...register('apartmentNumber')} placeholder="Enter Room Number" />
        </SharedLabel>
      </fieldset>
    </Fragment>
  );
};
