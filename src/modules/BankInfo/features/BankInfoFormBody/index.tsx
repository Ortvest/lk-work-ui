import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { banks } from '@shared/mocks/BankInfo.mocks';
import { useTranslation } from "react-i18next";

export const BankInfoFormBody = (): JSX.Element => {
  const { register } = useFormContext();
  const { t } = useTranslation("employee-sidebar");

  return (
    <fieldset className={classNames('bank-info-form-fields-wrapper')}>
      <SharedLabel title={t("bankName")}>
        <SharedSelect {...register('bankName')} options={banks} />
      </SharedLabel>
      <SharedLabel title={t("bankAccountNumber")}>
        <SharedInput
          type="number"
          {...register('bankAccountNumber')}
          placeholder={t("enterBankAccountNumber")}
        />
      </SharedLabel>
    </fieldset>
  );
};
