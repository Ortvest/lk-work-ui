import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';

import './style.css';

export const WorkPermissionFormBody = (): JSX.Element => {
  const { control } = useFormContext();

  return (
    <fieldset className={classNames('work-permission-form-fields-wrapper')}>
      <Controller
        name="workPermitDocumentFile"
        control={control}
        render={({ field }) => (
          <SharedFileUpload title="Add a Scan or Photo Work Permission" onChange={(file) => field.onChange(file)} />
        )}
      />
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="workPermitExpirationDate" />
      <span className={classNames('work-permission-line')}></span>
      <Controller
        name="workPermitPaymentDocumentFile"
        control={control}
        render={({ field }) => (
          <SharedFileUpload title="Add a Scan or Photo Payment" onChange={(file) => field.onChange(file)} />
        )}
      />
      <Controller
        name="workPermitApplicationFile"
        control={control}
        render={({ field }) => (
          <SharedFileUpload title="Add a Scan or Photo Application" onChange={(file) => field.onChange(file)} />
        )}
      />
    </fieldset>
  );
};
