import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import { WorkPermissionData } from '@shared/interfaces/DocumentsData.interfaces';

export const WorkPermission = (): JSX.Element => {
  const methods = useForm<WorkPermissionData>();

  const onSaveHandler = (data: WorkPermissionData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className="work-permission">
        <form className={classNames('work-permission-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <SharedSectionHeader title="Work Permission" subtitle="Leave information about your work" />
          <fieldset className={classNames('documents-form-fields-wrapper')}>
            <SharedFileUpload {...methods.register('workPermissionFile')} />
            <SharedLabel title="Passport Number:*">
              <SharedInput type="text" {...methods.register('documentNumber')} placeholder="Enter your Number" />
            </SharedLabel>
            <SharedDateSelector dateSelectorTitle="Expiration Date:*" namePrefix="expirationDate" />
          </fieldset>
        </form>
      </section>
    </FormProvider>
  );
};
