import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';

import './style.css';

export const WorkPermissionFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('work-permission-form-fields-wrapper')}>
      <SharedFileUpload {...register('workPermissionFile')} title="Add a Scan or Photo Work Permission" />
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
      <span className={classNames('work-permission-line')}></span>
      <SharedFileUpload {...register('paymentFile')} title="Add a Scan or Photo Payment" />
      <SharedFileUpload {...register('applicationFile')} title="Add a Scan or Photo Application" />
    </fieldset>
  );
};
