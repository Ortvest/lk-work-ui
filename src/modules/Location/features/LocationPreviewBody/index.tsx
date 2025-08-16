import { Fragment } from 'react';
import classNames from 'classnames';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';
import { useTranslation } from "react-i18next";

export const LocationPreviewBody = (): JSX.Element => {
  const { t } = useTranslation("employee-sidebar");

  const address = useTypedSelector((state) => state.userReducer.user?.address);
  const selectedEmployeeAddress = useTypedSelector((state) => state.employeeReducer.selectedEmployee?.address);

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? address : selectedEmployeeAddress;

  return (
    <fieldset className={classNames('location-preview-fields-wrapper')}>
      {currentDataOrigin?.isLivingInAccommodation ? (
        <SharedLabel title={t("locationAccommodationAddress")}>
          <span>{currentDataOrigin?.accommodationAddress || '-'}</span>
        </SharedLabel>
      ) : (
        <Fragment>
          <SharedLabel title={t("locationCity")}>
            <span>{currentDataOrigin?.city || '-'}</span>
          </SharedLabel>
          <SharedLabel title={t("locationPostalCode")}>
            <span>{currentDataOrigin?.postalCode || '-'}</span>
          </SharedLabel>
          <SharedLabel title={t("locationStreet")}>
            <span>{currentDataOrigin?.street || '-'}</span>
          </SharedLabel>
          <SharedLabel title={t("locationHouseNumber")}>
            <span>{currentDataOrigin?.houseNumber || '-'}</span>
          </SharedLabel>
          <SharedLabel title={t("locationApartmentNumber")}>
            <span>{currentDataOrigin?.apartmentNumber || '-'}</span>
          </SharedLabel>
        </Fragment>
      )}
    </fieldset>
  );
};
