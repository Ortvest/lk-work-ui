import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CheckBoxField } from '@modules/PersonalInfo/features/CheckBoxField';
import { EmailField } from '@modules/PersonalInfo/features/EmailField';
import { GenderFields } from '@modules/PersonalInfo/features/GenderFields';
import { NameFields } from '@modules/PersonalInfo/features/NameFields';
import { PhoneNumberFields } from '@modules/PersonalInfo/features/PhoneNumberFields';
import { PhotoField } from '@modules/PersonalInfo/features/PhotoField';
import { PersonalInfoHeader } from '@modules/PersonalInfo/layout/PersonalInfoHeader';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedButton } from '@shared/components/SharedButton';
import { SharedDateSelector } from '@shared/components/SharedDateSelector';

import './style.css';

import { PersonalInfoData } from '@shared/types/PersonalInfoData.types';

export const PersonalInfo = (): JSX.Element => {
  const methods = useForm<PersonalInfoData>();

  const onSaveHanlder = (data: PersonalInfoData): void => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <section className={classNames('personal-info')}>
        <StatusPanel />
        <form className={classNames('personal-info-form')} onSubmit={methods.handleSubmit(onSaveHanlder)}>
          <div className={classNames('personal-info-header-wrapper')}>
            <PersonalInfoHeader />
            <SharedButton type="submit" text="Save" />
          </div>
          <fieldset className={classNames('personal-info-form-fields-wrapper')}>
            <PhotoField />
            <NameFields />
            <SharedDateSelector title="Birth date:*" namePrefix="dateOfBirth" />
            <GenderFields />
            <PhoneNumberFields
              prefixName="requiredPhoneNumber.prefix"
              numberName="requiredPhoneNumber.number"
              title="Phone number:*"
            />
            <PhoneNumberFields
              prefixName="optionalPhoneNumber.prefix"
              numberName="optionalPhoneNumber.number"
              title="Phone number:"
            />
            <EmailField />
          </fieldset>
          <CheckBoxField />
        </form>
      </section>
    </FormProvider>
  );
};
