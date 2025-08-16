import React, { Fragment, useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { LocationFormBody } from '@modules/Location/features/LocationFormBody';
import { LocationPreviewBody } from '@modules/Location/features/LocationPreviewBody';
import { Sidebar } from '@modules/Sidebar';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { GlobalContainer } from '@shared/components/GlobalContainer';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useLazyGetAllAccommodationsQuery } from '@global/api/accommodations/accommodation.api';
import { useCollectUserAddressMutation } from '@global/api/updateUserData/collectData.api';
import { UserRoles } from '@shared/enums/user.enums';
import { Address } from '@shared/interfaces/User.interfaces';
import { useTranslation } from "react-i18next";

export const Location = (): React.ReactNode => {
  const {t} = useTranslation("employee-sidebar")
  const locationInfo = useTypedSelector((state) => state.userReducer.user?.address);
  const selectedEmployeeLocationInfo = useTypedSelector((state) => state.employeeReducer.selectedEmployee?.address);

  const employeeId = useTypedSelector((state) => state.employeeReducer.selectedEmployee?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const [collectUserAddress] = useCollectUserAddressMutation();
  const [fetchAllAccommodations] = useLazyGetAllAccommodationsQuery();

  const dispatch = useTypedDispatch();

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? locationInfo : selectedEmployeeLocationInfo;

  const methods = useForm<Address>({
    defaultValues: {
      city: currentDataOrigin?.city || '',
      postalCode: currentDataOrigin?.postalCode || '',
      street: currentDataOrigin?.street || '',
      houseNumber: currentDataOrigin?.houseNumber || '',
      apartmentNumber: currentDataOrigin?.apartmentNumber || '',
      accommodationAddress: currentDataOrigin?.accommodationAddress || '',
      isLivingInAccommodation: currentDataOrigin?.isLivingInAccommodation || false,
    },
  });

  const onSaveHandler = async (data: Address): Promise<void> => {
    if (!employeeId) return;

    try {
      await collectUserAddress({ address: data, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  useEffect(() => {
    if (currentDataOrigin) {
      methods.reset({
        city: currentDataOrigin.city || '',
        postalCode: currentDataOrigin.postalCode || '',
        street: currentDataOrigin.street || '',
        houseNumber: currentDataOrigin.houseNumber || '',
        apartmentNumber: currentDataOrigin.apartmentNumber || '',
        accommodationAddress: currentDataOrigin.accommodationAddress || '',
        isLivingInAccommodation: currentDataOrigin.isLivingInAccommodation || false,
      });
    }
  }, [currentDataOrigin]);

  const onFetchAllAccommodationsHanlder = async (): Promise<void> => {
    await fetchAllAccommodations(undefined);
  };

  useEffect(() => {
    (async (): Promise<void> => {
      await onFetchAllAccommodationsHanlder();
    })()
  }, []);

  return (
    <Fragment>
      {userRole !== UserRoles.EMPLOYEE ? (
        <FormProvider {...methods}>
          <GlobalContainer>
            <Sidebar />
            <section className={classNames('location')}>
              <form className={classNames('location-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
                <StatusPanel />
                <SharedSectionHeader
                  title={t("routeLocation")}
                  subtitle={t("routeLocationDescription")}
                />
                {isEditModeEnabled ? <LocationFormBody /> : <LocationPreviewBody />}
              </form>
            </section>
          </GlobalContainer>
        </FormProvider>
      ) : (
        <FormProvider {...methods}>
          <section className={classNames('location')}>
            <form className={classNames('location-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
              <StatusPanel />
              <SharedSectionHeader
                title={t("routeLocation")}
                subtitle={t("routeLocationDescription")}
              />
              {isEditModeEnabled ? <LocationFormBody /> : <LocationPreviewBody />}
            </form>
          </section>
        </FormProvider>
      )}
    </Fragment>
  );
};
