import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';
import { SharedSelect } from '@shared/components/SharedSelect';

import { ResidenceCardData } from '@shared/interfaces/DocumentsData.interfaces';
import { countries, reasons } from '@shared/mocks/ResidenceCard.mocks';

export const ResidenceCard = (): JSX.Element => {
  const methods = useForm<ResidenceCardData>();

  const onSaveHandler = (data: ResidenceCardData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className="residence-card">
        <form className={classNames('residence-card-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <SharedSectionHeader title="Residence Card" subtitle="Leave a photo of the document" />
          <fieldset className={classNames('documents-form-fields-wrapper')}>
            <SharedFileUpload {...methods.register('resedenceCardFile')} />
            <SharedLabel title="Card Number:">
              <SharedInput type="text" {...methods.register('cardNumber')} placeholder="Enter your Number" />
            </SharedLabel>
            <SharedLabel title="Country of Issue:">
              <SharedSelect options={countries} {...methods.register('countryOfIssue')} />
            </SharedLabel>
            <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
            <SharedDateSelector dateSelectorTitle="Expiration Date:*" namePrefix="expirationDate" />
            <SharedLabel title="Reason for issuance:">
              <SharedSelect options={reasons} {...methods.register('reasonForIssuance')} />
            </SharedLabel>
          </fieldset>
        </form>
      </section>
    </FormProvider>
  );
};
