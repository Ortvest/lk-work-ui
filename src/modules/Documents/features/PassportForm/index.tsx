import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import { PassportData } from '@shared/interfaces/DocumentsData.interfaces';

export const Passport = (): JSX.Element => {
  const methods = useForm<PassportData>();
  const onSaveHandler = (data: PassportData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className="passport">
        <form className={classNames('passport-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <SharedSectionHeader title="Passport" subtitle="Fill in your passport details" />
          <fieldset className={classNames('documents-form-fields-wrapper')}>
            <SharedFileUpload {...methods.register('passportFile')} />
            <SharedLabel title="Passport Number:*">
              <SharedInput type="text" {...methods.register('passportNumber')} placeholder="Enter your Number" />
            </SharedLabel>
            <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
            <SharedDateSelector dateSelectorTitle="Expiration Date:*" namePrefix="expirationDate" />
          </fieldset>
        </form>
      </section>
    </FormProvider>
  );
};
