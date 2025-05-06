import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { ResidenceCardFormBody } from '@modules/Documents/ResidenceCard/features/ResidenceCardFormBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { ResidenceCardData } from '@shared/interfaces/DocumentsData.interfaces';

export const ResidenceCard = (): JSX.Element => {
  const methods = useForm<ResidenceCardData>();

  const onSaveHandler = (data: ResidenceCardData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('.residence-card')}>
        <form className={classNames('.residence-card-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader
            title="Residence Card"
            subtitle="Leave a photo of the document. Make sure the document is in good quality."
          />
          <ResidenceCardFormBody />
        </form>
      </section>
    </FormProvider>
  );
};
