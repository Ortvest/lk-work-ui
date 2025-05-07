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

import { QuestionnaireData } from '@shared/interfaces/PersonalInfoData.interfaces';

export const Questionnaire = (): JSX.Element => {
  const navigate = useNavigate();
  const methods = useForm<QuestionnaireData>({
    defaultValues: {
      emailAgreement: true,
    },
  });
  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const onSaveHandler = (data: QuestionnaireData): void => {
    console.log(data);
    navigate(AppRoutes.PERSONAL_INFO.path);
    dispatch(setIsEditModeEnabled(false));
  };

  useEffect(() => {
    dispatch(setIsEditModeEnabled(true));
    console.log('Hello');
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
