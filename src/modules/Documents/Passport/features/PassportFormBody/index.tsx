import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const PassportFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('passport-form-fields-wrapper')}>
      <SharedFileUpload {...register('passportFile')} />
      <SharedLabel title="PassportNumber:*">
        <SharedInput {...register('passportNumber')} type="number" placeholder="Enter your number..." />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
      <SharedDateSelector dateSelectorTitle="Expiration Date:*" namePrefix="expirationDate" />
    </fieldset>
  );
};
