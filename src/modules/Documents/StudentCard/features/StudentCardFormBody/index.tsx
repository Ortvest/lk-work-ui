import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';

import './style.css';

export const StudentCardFormBody = (): JSX.Element => {
  const { control } = useFormContext();

  return (
    <fieldset className={classNames('student-card-form-fields-wrapper')}>
      <Controller
        name="studentFrontCardFile"
        control={control}
        render={({ field }) => <SharedFileUpload onChange={(file) => field.onChange(file)} />}
      />
      <Controller
        name="studentBackCardFile"
        control={control}
        render={({ field }) => <SharedFileUpload onChange={(file) => field.onChange(file)} />}
      />
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="studentStatusDate" />
      <span className={classNames('student-card-line')}></span>
      <Controller
        name="studentPermitCardFile"
        control={control}
        render={({ field }) => <SharedFileUpload onChange={(file) => field.onChange(file)} />}
      />
    </fieldset>
  );
};
