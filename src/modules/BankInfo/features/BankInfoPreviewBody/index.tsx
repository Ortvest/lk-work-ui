import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const BankInfoPreviewBody = (): JSX.Element => {
  const bankInfo = useTypedSelector((state) => state.userReducer.user?.bankInfo);
  return (
    <fieldset className={classNames('bank-info-preview-fields-wrapper')}>
      <SharedLabel title="Bank Name:">
        <span>{bankInfo?.bankName || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Account Bank Number:">
        <span>{bankInfo?.bankAccountNumber || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
