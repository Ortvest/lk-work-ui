import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { BankInfoFormBody } from '@modules/BankInfo/features/BankInfoFormBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { BankInfoData } from '@shared/interfaces/BankInfoData.interfaces';

export const BankInfo = (): JSX.Element => {
  const methods = useForm<BankInfoData>();

  const onSaveHandler = (data: BankInfoData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('bank-info')}>
        <form className={classNames('bank-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader title="Bank Info" subtitle="Leave information about your bank" />
          <BankInfoFormBody />
        </form>
      </section>
    </FormProvider>
  );
};
