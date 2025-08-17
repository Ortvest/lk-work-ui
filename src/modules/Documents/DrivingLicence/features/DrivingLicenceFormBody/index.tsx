import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { drivingCategories } from '@shared/mocks/DrivingCategories.mocks';

export const DrivingLicenceFormBody = (): JSX.Element => {
  const { register, control } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <fieldset className={classNames('driving-licence-form-fields-wrapper')}>
      <Controller
        name="drivingLicenceFrontCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload title={t('drivingLicenceFront')} onChange={(file) => field.onChange(file)} />
        )}
      />
      <Controller
        name="drivingLicenceBackCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload title={t('drivingLicenceBack')} onChange={(file) => field.onChange(file)} />
        )}
      />
      <SharedLabel title={t('drivingLicenceCategories')}>
        <SharedSelect {...register('drivingLicenceCategories')} options={drivingCategories} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle={t('drivingLicenceDateOfIssue')} namePrefix="drivingLicenseDateOfIssue" />
      <SharedDateSelector
        dateSelectorTitle={t('drivingLicenceExpirationDate')}
        namePrefix="drivingLicenseExpirationDate"
      />
    </fieldset>
  );
};
