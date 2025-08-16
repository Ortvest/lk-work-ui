import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';

import { useTranslation } from 'react-i18next';

import './style.css';

export const WorkPermissionFormBody = (): JSX.Element => {
  const { control } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <fieldset className={classNames('work-permission-form-fields-wrapper')}>
      <Controller
        name="workPermitDocumentFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('workPermissionScan')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <SharedDateSelector
        dateSelectorTitle={t('workPermissionDateOfIssue')}
        namePrefix="workPermitExpirationDate"
      />
      <span className={classNames('work-permission-line')}></span>
      <Controller
        name="workPermitPaymentDocumentFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('workPermissionPayment')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <Controller
        name="workPermitApplicationFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('workPermissionApplication')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
    </fieldset>
  );
};
