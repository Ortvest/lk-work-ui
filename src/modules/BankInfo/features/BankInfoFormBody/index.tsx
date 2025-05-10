import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { banks } from '@shared/mocks/BankInfo.mocks';

export const BankInfoFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('bank-info-form-fields-wrapper')}>
      <SharedLabel title="Bank Name:">
        <SharedSelect {...register('bankName')} options={banks} />
      </SharedLabel>
      <SharedLabel title="Account Bank Number:">
        <SharedInput type="number" {...register('bankAccountNumber')} placeholder="Enter Account Bank Number..." />
      </SharedLabel>
    </fieldset>
  );
};
