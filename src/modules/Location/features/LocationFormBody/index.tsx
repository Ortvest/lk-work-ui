import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { citiesMock } from '@shared/mocks/Cities.mocks';

export const LocationFormBody = (): JSX.Element => {
  const { register, watch } = useFormContext();

  const isLivingInAccommodation = watch('isLivingInAccommodation');
  const accommodations = useTypedSelector((state) => state.accommodationReducer.accommodations);

  const options = accommodations.map((accommodation) => ({
    value: accommodation.address,
    label: accommodation.address,
  }));

  return (
    <fieldset className={classNames('location-form-fields-wrapper')}>
      <SharedBooleanSelector name="isLivingInAccommodation" label="You live in accommodation?" />
      {isLivingInAccommodation ? (
        <SharedLabel title="Choose accommodation:*">
          <SharedSelect options={options} {...register('accommodationAddress')} />
        </SharedLabel>
      ) : (
        <Fragment>
          <SharedLabel title="City:*">
            <SharedSelect {...register('city')} options={citiesMock} />
          </SharedLabel>
          <SharedLabel title="Postal Сode:*">
            <SharedInput type="text" {...register('postalCode')} placeholder="Enter postal code" />
          </SharedLabel>
          <SharedLabel title="Street:*">
            <SharedInput type="text" {...register('street')} placeholder="Enter your street" />
          </SharedLabel>
          <SharedLabel title="House Number:*">
            <SharedInput type="text" {...register('houseNumber')} placeholder="Enter house number" />
          </SharedLabel>
          <SharedLabel title="Apartment Number:*">
            <SharedInput type="text" {...register('apartmentNumber')} placeholder="Enter apartment number" />
          </SharedLabel>
        </Fragment>
      )}
    </fieldset>
  );
};
