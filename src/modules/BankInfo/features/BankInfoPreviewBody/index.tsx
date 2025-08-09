import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const BankInfoPreviewBody = (): JSX.Element => {
  const bankInfo = useTypedSelector((state) => state.userReducer.user?.bankInfo);
  const selectedEmployeeBankInfo = useTypedSelector((state) => state.employeeReducer.selectedEmployee?.bankInfo);
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? bankInfo : selectedEmployeeBankInfo;

  return (
    <fieldset className={classNames('bank-info-preview-fields-wrapper')}>
      <SharedLabel title="Bank Name:">
        <span>{currentDataOrigin?.bankName || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Account Bank Number:">
        <span>{currentDataOrigin?.bankAccountNumber || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
