import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { bankPositions, banks } from '@shared/mocks/BankInfo.mocks';

export const BankInfoFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('bank-info-form-fields-wrapper')}>
      <SharedLabel title="Bank Name:">
        <SharedSelect {...register('bankName')} options={banks} />
      </SharedLabel>
      <SharedLabel title="Position:">
        <SharedSelect {...register('position')} options={bankPositions} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle="Date of Commencement:" namePrefix="dateOfDateCommencement" />
    </fieldset>
  );
};
