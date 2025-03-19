import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { LocationFormBody } from '@modules/Location/features/LocationFormBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { LocationData } from '@shared/interfaces/LocationData.interfaces';

export const Location = (): JSX.Element => {
  const methods = useForm<LocationData>();

  const onSaveHandler = (data: LocationData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('location')}>
        <StatusPanel />
        <form className={classNames('location-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <SharedSectionHeader title="Location" subtitle="Fill in information about your actual place of residence" />
          <LocationFormBody />
        </form>
      </section>
    </FormProvider>
  );
};
