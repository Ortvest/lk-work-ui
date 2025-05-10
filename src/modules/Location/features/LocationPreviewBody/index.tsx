import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const LocationPreviewBody = (): JSX.Element => {
  const address = useTypedSelector((state) => state.userReducer.user?.address);

  return (
    <fieldset className={classNames('location-preview-fields-wrapper')}>
      <SharedLabel title="City:">
        <span>{address?.city || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Postal Code:">
        <span>{address?.postalCode || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Street:">
        <span>{address?.street || '-'}</span>
      </SharedLabel>
      <SharedLabel title="House Number:">
        <span>{address?.houseNumber || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Apartment Number:">
        <span>{address?.apartmentNumber || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
