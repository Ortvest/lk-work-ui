import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { visaTypes } from '@shared/mocks/VisaInfo.mocks';

export const VisaInfoFormBody = (): JSX.Element => {
  const { register, control } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <fieldset className={classNames('visa-info-form-fields-wrapper')}>
      <Controller
        name="visaDocumentFileKey"
        control={control}
        render={({ field }) => <SharedFileUpload title={t('visaInfoFile')} onChange={(file) => field.onChange(file)} />}
      />
      <SharedLabel title={`${t('visaInfoType')}*`}>
        <SharedSelect {...register('visaType')} options={visaTypes} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle={`${t('visaInfoDateOfIssue')}*`} namePrefix="dateOfIssue" />
      <SharedDateSelector dateSelectorTitle={`${t('visaInfoExpirationDate')}*`} namePrefix="expirationDate" />
    </fieldset>
  );
};
