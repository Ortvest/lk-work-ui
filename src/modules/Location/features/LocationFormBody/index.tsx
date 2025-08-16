import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { citiesMock } from '@shared/mocks/Cities.mocks';

export const LocationFormBody = (): JSX.Element => {
  const { register, watch } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  const isLivingInAccommodation = watch('isLivingInAccommodation');
  const accommodations = useTypedSelector((state) => state.accommodationReducer.accommodations);

  const options = accommodations.map((accommodation) => ({
    value: accommodation.address,
    label: accommodation.address,
  }));

  return (
    <fieldset className={classNames('location-form-fields-wrapper')}>
      <SharedBooleanSelector name="isLivingInAccommodation" label={t('locationIsLivingInAccommodation')} />

      {isLivingInAccommodation ? (
        <SharedLabel title={t('locationChooseAccommodation')}>
          <SharedSelect options={options} {...register('accommodationAddress')} />
        </SharedLabel>
      ) : (
        <Fragment>
          <SharedLabel title={t('locationCityLabel')}>
            <SharedSelect {...register('city')} options={citiesMock} />
          </SharedLabel>
          <SharedLabel title={t('locationPostalCodeLabel')}>
            <SharedInput type="text" {...register('postalCode')} placeholder={t('locationPostalCodePlaceholder')} />
          </SharedLabel>
          <SharedLabel title={t('locationStreetLabel')}>
            <SharedInput type="text" {...register('street')} placeholder={t('locationStreetPlaceholder')} />
          </SharedLabel>
          <SharedLabel title={t('locationHouseNumberLabel')}>
            <SharedInput type="text" {...register('houseNumber')} placeholder={t('locationHouseNumberPlaceholder')} />
          </SharedLabel>
          <SharedLabel title={t('locationApartmentNumberLabel')}>
            <SharedInput
              type="text"
              {...register('apartmentNumber')}
              placeholder={t('locationApartmentNumberPlaceholder')}
            />
          </SharedLabel>
        </Fragment>
      )}
    </fieldset>
  );
};
