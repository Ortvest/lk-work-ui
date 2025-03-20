import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';
import { SharedSelect } from '@shared/components/SharedSelect';

import { VisaInfoData } from '@shared/interfaces/DocumentsData.interfaces';
import { visaTypes } from '@shared/mocks/VisaInfo.mocks';

export const VisaInfo = (): JSX.Element => {
  const methods = useForm<VisaInfoData>();

  const onSaveHandler = (data: VisaInfoData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className="visa-info">
        <form className={classNames('visa-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <SharedSectionHeader title="Visa Information" subtitle="Fill in the information" />
          <fieldset className={classNames('documents-form-fields-wrapper')}>
            <SharedFileUpload {...methods.register('visaInfoFile')} />
            <SharedLabel title="Type Visa:">
              <SharedSelect options={visaTypes} {...methods.register('visaType')} />
            </SharedLabel>
            <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
            <SharedDateSelector dateSelectorTitle="Expiration Date:*" namePrefix="expirationDate" />
          </fieldset>
        </form>
      </section>
    </FormProvider>
  );
};
