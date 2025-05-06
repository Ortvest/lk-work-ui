import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { drivingCategories } from '@shared/mocks/DrivingCategories.mocks';

export const DrivingLicenceFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('residence-card-form-fields-wrapper')}>
      <SharedFileUpload {...register('documentPhotoFirst')} />
      <SharedFileUpload {...register('documentPhotosecond')} />
      <SharedLabel title="Categories:*">
        <SharedSelect {...register('categories')} options={drivingCategories} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
      <SharedDateSelector dateSelectorTitle="Expiration Date::*" namePrefix="expirationDate" />
    </fieldset>
  );
};
