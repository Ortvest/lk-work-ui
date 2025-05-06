import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { countries, reasons } from '@shared/mocks/ResidenceCard.mocks';

export const ResidenceCardFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('residence-card-form-fields-wrapper')}>
      <SharedFileUpload {...register('resedenceCardFile')} title="Add a Scan or Photo Residence Card" />
      <SharedLabel title="Card Number:*">
        <SharedInput {...register('cardNumber')} type="number" placeholder="Enter card number..." />
      </SharedLabel>
      <SharedLabel title="Country of Issue:*">
        <SharedSelect {...register('countryOfIssue')} options={countries} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
      <SharedDateSelector dateSelectorTitle="Expiration Date::*" namePrefix="expirationDate" />
      <SharedLabel title="Reason for issuance:*">
        <SharedSelect {...register('reasonForIssuance')} options={reasons} />
      </SharedLabel>
    </fieldset>
  );
};
