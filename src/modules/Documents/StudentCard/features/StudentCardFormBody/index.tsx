import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';

import './style.css';

import { useTranslation } from 'react-i18next';

export const StudentCardFormBody = (): JSX.Element => {
  const { control } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <fieldset className={classNames('student-card-form-fields-wrapper')}>
      <Controller
        name="studentFrontCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('studentCardSide1')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <Controller
        name="studentBackCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('studentCardSide2')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <SharedDateSelector
        dateSelectorTitle={t('studentCardDateOfIssue')}
        namePrefix="studentStatusDate"
      />
      <span className={classNames('student-card-line')}></span>
      <Controller
        name="studentPermitCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('studentCardStatement')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
    </fieldset>
  );
};
