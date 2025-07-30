import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const PassportFormBody = (): JSX.Element => {
  const { register, control } = useFormContext();

  return (
    <fieldset className={classNames('passport-form-fields-wrapper')}>
      <Controller
        name="passportFileKey"
        control={control}
        render={({ field }) => <SharedFileUpload onChange={(file) => field.onChange(file)} />}
      />
      <SharedLabel title="PassportNumber:*">
        <SharedInput {...register('passportNumber')} type="text" placeholder="Enter your number..." />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="passportDateOfIssue" />
      <SharedDateSelector dateSelectorTitle="Expiration Date:*" namePrefix="passportExpirationDate" />
    </fieldset>
  );
};
