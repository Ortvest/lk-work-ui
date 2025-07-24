import { useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { AppRoutes } from '@global/router/routes.constans';

import { AddressSection } from '@modules/Questionnaire/features/AddressSection';
import { ContactSection } from '@modules/Questionnaire/features/ContactsSection';
import { PersonalInfoSection } from '@modules/Questionnaire/features/PersonalInfoSection';
import { PrefferedCompaniesSection } from '@modules/Questionnaire/features/PrefferedCompaniesSection';
//import { WorkStartSection } from '@modules/Questionnaire/features/WorkStartSection';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './style.css';

import {
  useCollectUserAddressMutation,
  useCollectUserDocumentStatusDataMutation,
  useCollectUserPersonalInfoMutation,
} from '@global/api/updateUserData/collectData.api';
import { UserDocumentsStatuses } from '@shared/enums/user.enums';
import { Address, PersonalInfo } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const Questionnaire = (): JSX.Element => {
  const methods = useForm<PersonalInfo & Address>();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const userDocumentStatus = useTypedSelector((state) => state.userReducer.user?.documentStatus);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [collectUserPersonalInfo] = useCollectUserPersonalInfoMutation();
  const [collectUserDocumentStatus] = useCollectUserDocumentStatusDataMutation();
  const [collectAddressMutation] = useCollectUserAddressMutation();

  const onSaveHandler = async (data: PersonalInfo & Address): Promise<void> => {
    if (!employeeId) return;

    const parsedPersonalInfoData: PersonalInfo = {
      ...data,
      dateOfBirth: dateParser(JSON.stringify(data.dateOfBirth)),
      nationalPhoneNumber:
        typeof data.nationalPhoneNumber === 'object'
          ? data.nationalPhoneNumber?.prefix + data.nationalPhoneNumber?.number
          : '',
      polishPhoneNumber:
        typeof data.polishPhoneNumber === 'object'
          ? data.polishPhoneNumber?.prefix + data.polishPhoneNumber?.number
          : '',
    };

    const parsedAddressData: Address = {
      city: data.city,
      postalCode: data.postalCode,
      street: data.street,
      houseNumber: data.houseNumber,
      apartmentNumber: data.apartmentNumber,
    };

    try {
      await collectUserPersonalInfo({ personalData: parsedPersonalInfoData, employeeId });
      await collectAddressMutation({ address: parsedAddressData, employeeId });
      await collectUserDocumentStatus({ documentStatusInfo: UserDocumentsStatuses.TO_CONFIRM, employeeId });
      dispatch(setIsEditModeEnabled(false));
      navigate(AppRoutes.PERSONAL_INFO.path);
    } catch (error) {
      console.error('Failed to save questionnaire info:', error);
    }
  };

  useEffect(() => {
    dispatch(setIsEditModeEnabled(true));
  }, []);

  useEffect(() => {
    if (userDocumentStatus !== UserDocumentsStatuses.WAITING_FOR_BRIEFING) {
      navigate(AppRoutes.PERSONAL_INFO.path, { replace: true });
    }
  }, [userDocumentStatus]);

  return (
    <FormProvider {...methods}>
      <section className={classNames('questionnaire')}>
        <form className={classNames('questionnaire-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <PersonalInfoSection />
          <ContactSection />
          <AddressSection />
          {/* <WorkStartSection /> */}
          <PrefferedCompaniesSection />
        </form>
      </section>
    </FormProvider>
  );
};
