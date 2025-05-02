import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { JobInfoFormBody } from '@modules/JobInfo/features/JobInfoFromBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { JobInfoData } from '@shared/interfaces/JobInfoData.interfaces';

export const JobInfo = (): JSX.Element => {
  const methods = useForm<JobInfoData>();

  const onSaveHandler = (data: JobInfoData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('job-info')}>
        <form className={classNames('job-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader title="Job Info" subtitle="Leave information about your work" />
          <JobInfoFormBody />
        </form>
      </section>
    </FormProvider>
  );
};
