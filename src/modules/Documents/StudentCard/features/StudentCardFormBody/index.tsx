import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';

import './style.css';

export const StudentCardFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('student-card-form-fields-wrapper')}>
      <SharedFileUpload {...register('studentCardFront')} title="Add a Scan or Photo Student Card - Side 1" />
      <SharedFileUpload {...register('studentCardBack')} title="Add a Scan or Photo Studen Card - Side 2" />
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
      <span className={classNames('student-card-line')}></span>
      <SharedFileUpload {...register('statementFile')} title="Add a Scan or Photo Statement" />
    </fieldset>
  );
};
