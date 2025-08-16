import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';


import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { drivingCategories } from '@shared/mocks/DrivingCategories.mocks';
import { useTranslation } from "react-i18next";

export const DrivingLicenceFormBody = (): JSX.Element => {
  const { register, control } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <fieldset className={classNames('driving-licence-form-fields-wrapper')}>
      <Controller
        name="drivingLicenceFrontCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('drivingLicenceFront')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <Controller
        name="drivingLicenceBackCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('drivingLicenceBack')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <SharedLabel title={t('drivingLicenceCategories')}>
        <SharedSelect {...register('drivingLicenceCategories')} options={drivingCategories} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle={t('drivingLicenceDateOfIssue')} namePrefix="drivingLicenceDateOfIssue" />
      <SharedDateSelector dateSelectorTitle={t('drivingLicenceExpirationDate')} namePrefix="drivingLicenceExpirationDate" />
    </fieldset>
  );
};
