import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

export const AddressSection = (): JSX.Element => {
  const { register, watch } = useFormContext();

  const isLivingInAccommodation = watch('isLivingInAccommodation');
  const accommodations = useTypedSelector((state) => state.accommodationReducer.accommodations);

  const options = accommodations.map((accommodation) => ({
    value: accommodation.address,
    label: accommodation.address,
  }));

  return (
    <Fragment>
      <SharedSectionHeader title="Address" subtitle="Full Correspondence Address" />

      <fieldset className={classNames('questionnaire-address-fields-wrapper')}>
        <SharedBooleanSelector name="isLivingInAccommodation" label="You live in accommodation?" />
        {isLivingInAccommodation ? (
          <SharedLabel title="Choose accommodation:*">
            <SharedSelect options={options} {...register('accommodationAddress')} />
          </SharedLabel>
        ) : (
          <Fragment>
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
          </Fragment>
        )}
      </fieldset>
    </Fragment>
  );
};
