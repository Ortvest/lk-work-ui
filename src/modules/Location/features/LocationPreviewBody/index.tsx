import { Fragment } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const LocationPreviewBody = (): JSX.Element => {
  const address = useTypedSelector((state) => state.userReducer.user?.address);
  const selectedEmployeeAddress = useTypedSelector((state) => state.employeeReducer.selectedEmployee?.address);

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? address : selectedEmployeeAddress;

  return (
    <fieldset className={classNames('location-preview-fields-wrapper')}>
      {currentDataOrigin?.isLivingInAccommodation ? (
        <SharedLabel title="Accommodation address:">
          <span>{currentDataOrigin?.accommodationAddress || '-'}</span>
        </SharedLabel>
      ) : (
        <Fragment>
          <SharedLabel title="City:">
            <span>{currentDataOrigin?.city || '-'}</span>
          </SharedLabel>
          <SharedLabel title="Postal Code:">
            <span>{currentDataOrigin?.postalCode || '-'}</span>
          </SharedLabel>
          <SharedLabel title="Street:">
            <span>{currentDataOrigin?.street || '-'}</span>
          </SharedLabel>
          <SharedLabel title="House Number:">
            <span>{currentDataOrigin?.houseNumber || '-'}</span>
          </SharedLabel>
          <SharedLabel title="Apartment Number:">
            <span>{currentDataOrigin?.apartmentNumber || '-'}</span>
          </SharedLabel>
        </Fragment>
      )}
    </fieldset>
  );
};
