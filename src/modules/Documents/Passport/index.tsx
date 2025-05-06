import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { PassportFormBody } from '@modules/Documents/Passport/features/PassportFormBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { PassportData } from '@shared/interfaces/DocumentsData.interfaces';

export const Passport = (): JSX.Element => {
  const methods = useForm<PassportData>();

  const onSaveHandler = (data: PassportData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('passport')}>
        <form className={classNames('passport-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader title="Passport" subtitle="Fill in your passport details" />
          <PassportFormBody />
        </form>
      </section>
    </FormProvider>
  );
};
