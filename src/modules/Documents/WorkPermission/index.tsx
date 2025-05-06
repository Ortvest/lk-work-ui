import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { WorkPermissionFormBody } from '@modules/Documents/WorkPermission/features/WorkPermissionBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { WorkPermissionData } from '@shared/interfaces/DocumentsData.interfaces';

export const WorkPermission = (): JSX.Element => {
  const methods = useForm<WorkPermissionData>();

  const onSaveHandler = (data: WorkPermissionData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('work-permission')}>
        <form className={classNames('work-permission-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader
            title="Work Permission"
            subtitle="Leave a photo of the document. Make sure the document is in good quality."
          />
          <WorkPermissionFormBody />
        </form>
      </section>
    </FormProvider>
  );
};
