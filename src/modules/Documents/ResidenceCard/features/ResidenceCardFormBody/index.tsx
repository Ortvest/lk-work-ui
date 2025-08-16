import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { countries, reasons } from '@shared/mocks/ResidenceCard.mocks';
import { useTranslation } from 'react-i18next';

export const ResidenceCardFormBody = (): JSX.Element => {
  const { register, control } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <fieldset className={classNames('residence-card-form-fields-wrapper')}>
      <Controller
        name="residenceCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('residenceCardUpload')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <SharedLabel title={t('residenceCardNumberRequired')}>
        <SharedInput
          {...register('cardNumber')}
          type="number"
          placeholder={t('residenceCardNumberPlaceholder')}
        />
      </SharedLabel>
      <SharedLabel title={t('residenceCardCountryRequired')}>
        <SharedSelect
          {...register('countryOfIssue')}
          options={countries}
        />
      </SharedLabel>
      <SharedDateSelector
        dateSelectorTitle={t('residenceCardDateOfIssueRequired')}
        namePrefix="dateOfIssue"
      />
      <SharedDateSelector
        dateSelectorTitle={t('residenceCardExpirationDateRequired')}
        namePrefix="expirationDate"
      />
      <SharedLabel title={t('residenceCardReasonRequired')}>
        <SharedSelect
          {...register('reasonForIssuance')}
          options={reasons}
        />
      </SharedLabel>
    </fieldset>
  );
};
