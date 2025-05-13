import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { drivingCategories } from '@shared/mocks/DrivingCategories.mocks';

export const DrivingLicenceFormBody = (): JSX.Element => {
  const { register, control } = useFormContext();

  return (
    <fieldset className={classNames('driving-licence-form-fields-wrapper')}>
      <Controller
        name="drivingLicenceFrontCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload title="Upload Front Card Photo" onChange={(file) => field.onChange(file)} />
        )}
      />
      <Controller
        name="drivingLicenceBackCardFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload title="Upload Back Card Photo" onChange={(file) => field.onChange(file)} />
        )}
      />
      <SharedLabel title="Categories:*">
        <SharedSelect {...register('drivingLicenceCategories')} options={drivingCategories} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="drivingLicenseDateOfIssue" />
      <SharedDateSelector dateSelectorTitle="Expiration Date:*" namePrefix="drivingLicenseExpirationDate" />
    </fieldset>
  );
};
