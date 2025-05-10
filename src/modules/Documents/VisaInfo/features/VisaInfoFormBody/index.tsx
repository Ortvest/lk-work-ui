import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { visaTypes } from '@shared/mocks/VisaInfo.mocks';

export const VisaInfoFormBody = (): JSX.Element => {
  const { register, control } = useFormContext();

  return (
    <fieldset className={classNames('visa-info-form-fields-wrapper')}>
      <Controller
        name="visaDocumentFile"
        control={control}
        render={({ field }) => <SharedFileUpload onChange={(file) => field.onChange(file)} />}
      />
      <SharedLabel title="Type Visa:*">
        <SharedSelect {...register('visaType')} options={visaTypes} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
      <SharedDateSelector dateSelectorTitle="Expiration Date::*" namePrefix="expirationDate" />
    </fieldset>
  );
};
