import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { ContactSection } from '@modules/PersonalInfo/features/ContactsSection';
import { PersonalInfoSection } from '@modules/PersonalInfo/features/PersonalInfoSection';
import { PrefferedCompaniesSection } from '@modules/PersonalInfo/features/PrefferedCompaniesSection';
import { WorkStartSection } from '@modules/PersonalInfo/features/WorkStartSection';
import { StatusPanel } from '@modules/StatusPanel';

import './style.css';

import { PersonalInfoData } from '@shared/interfaces/PersonalInfoData.interfaces';

export const PersonalInfoForm = (): JSX.Element => {
  const methods = useForm<PersonalInfoData>({
    defaultValues: {
      emailAgreement: true,
    },
  });

  const onSaveHandler = (data: PersonalInfoData): void => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <section className={classNames('personal-info')}>
        <form className={classNames('personal-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <PersonalInfoSection />
          <ContactSection />
          <WorkStartSection />
          <PrefferedCompaniesSection />
        </form>
      </section>
    </FormProvider>
  );
};
