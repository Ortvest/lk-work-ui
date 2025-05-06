import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { VisaInfoFormBody } from '@modules/Documents/VisaInfo/features/VisaInfoFormBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { VisaInfoData } from '@shared/interfaces/DocumentsData.interfaces';

export const VisaInfo = (): JSX.Element => {
  const methods = useForm<VisaInfoData>();

  const onSaveHandler = (data: VisaInfoData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('visa-info')}>
        <form className={classNames('visa-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader
            title="Visa Information"
            subtitle="Leave a photo of the document. Make sure the document is in good quality."
          />
          <VisaInfoFormBody />
        </form>
      </section>
    </FormProvider>
  );
};
