import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { DrivingLicenceFormBody } from '@modules/Documents/DrivingLicence/features/DrivingLicenceFormBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { DrivingLicenceData } from '@shared/interfaces/DocumentsData.interfaces';

export const DrivingLicence = (): JSX.Element => {
  const methods = useForm<DrivingLicenceData>();

  const onSaveHandler = (data: DrivingLicenceData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('driving-licence')}>
        <form className={classNames('driving-licence-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader
            title="Driving Licence"
            subtitle="Leave a photo of the document. Make sure the document is in good quality."
          />
          <DrivingLicenceFormBody />
        </form>
      </section>
    </FormProvider>
  );
};
