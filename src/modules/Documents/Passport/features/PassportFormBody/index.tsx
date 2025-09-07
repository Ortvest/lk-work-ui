import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const PassportFormBody = (): JSX.Element => {
  const { register, control } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <fieldset className={classNames('passport-form-fields-wrapper')}>
      <Controller
        name="passportFileKey"
        control={control}
        render={({ field }) => <SharedFileUpload onChange={(file) => field.onChange(file)} />}
      />
      <SharedLabel title={t('passportNumberRequired')}>
        <SharedInput {...register('passportNumber')} type="text" placeholder={t('enterPassportNumber')} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle={t('passportDateOfIssueRequired')} namePrefix="passportDateOfIssue" />
      <SharedDateSelector dateSelectorTitle={t('passportExpirationDateRequired')} namePrefix="passportExpirationDate" />
    </fieldset>
  );
};
