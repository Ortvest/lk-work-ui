import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { citiesMock } from '@shared/mocks/Cities.mocks';

export const LocationFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('location-form-fields-wrapper')}>
      <SharedLabel title="City:*">
        <SharedSelect {...register('city')} options={citiesMock} />
      </SharedLabel>
      <SharedLabel title="Postal Сode:*">
        <SharedInput type="text" {...register('postalCode')} placeholder="Enter postal code" />
      </SharedLabel>
      <SharedLabel title=" Street:*">
        <SharedInput type="text" {...register('street')} placeholder="Enter your street" />
      </SharedLabel>
      <SharedLabel title="House Number:*">
        <SharedInput type="text" {...register('houseNumber')} placeholder="Enter house number" />
      </SharedLabel>
      <SharedLabel title="Apartment Number:*">
        <SharedInput type="text" {...register('apartmentNumber')} placeholder="Enter apartment number" />
      </SharedLabel>
    </fieldset>
  );
};
