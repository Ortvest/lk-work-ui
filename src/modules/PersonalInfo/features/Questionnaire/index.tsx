import { useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { AppRoutes } from '@global/router/routes.constans';

import { ContactSection } from '@modules/PersonalInfo/features/ContactsSection';
import { PrefferedCompaniesSection } from '@modules/PersonalInfo/features/PrefferedCompaniesSection';
import { Address } from '@modules/PersonalInfo/features/Questionnaire/features/Address';
import { QuestionnaireFormBody } from '@modules/PersonalInfo/features/Questionnaire/features/QuestionnaireFormBody';
import { WorkStartSection } from '@modules/PersonalInfo/features/WorkStartSection';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import {
  useCollectUserAddressMutation,
  useCollectUserPersonalInfoMutation,
} from '@global/api/updateUserData/collectData.api';
import { QuestionnaireData } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const Questionnaire = (): JSX.Element => {
  const navigate = useNavigate();
  const methods = useForm<QuestionnaireData>({
    defaultValues: {
      consentToEmailPIT: true,
    },
  });
  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);

  const [collectUserAddress] = useCollectUserAddressMutation();
  const [collectUserPersonalInfo] = useCollectUserPersonalInfoMutation();

  const onSaveHandler = async (data: QuestionnaireData): Promise<void> => {
    if (!employeeId) return;

    const location = {
      city: data.city,
      street: data.street,
      houseNumber: data.houseNumber,
      apartmentNumber: data.apartmentNumber,
      postalCode: data.postalCode,
    };

    const personalData = {
      ...data,
      dateOfBirth: dateParser(JSON.stringify(data.dateOfBirth!)),
      timeFromWorkStartDate: dateParser(JSON.stringify(data.timeFromWorkStartDate!)),
      nationalPhoneNumber: data.nationalPhoneNumber
        ? data.nationalPhoneNumber?.prefix + data.nationalPhoneNumber?.number
        : '',
      polishPhoneNumber: data.polishPhoneNumber ? data.polishPhoneNumber?.prefix + data.polishPhoneNumber?.number : '',
    };
    try {
      await collectUserPersonalInfo({ personalData, employeeId });
      await collectUserAddress({ address: location, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save address:', error);
    }

    navigate(AppRoutes.PERSONAL_INFO.path);
  };

  useEffect(() => {
    dispatch(setIsEditModeEnabled(true));
  }, []);

  return (
    <FormProvider {...methods}>
      <section className={classNames('personal-info')}>
        <form className={classNames('personal-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <QuestionnaireFormBody />
          <ContactSection />
          <Address />
          <WorkStartSection />
          <PrefferedCompaniesSection />
        </form>
      </section>
    </FormProvider>
  );
};
