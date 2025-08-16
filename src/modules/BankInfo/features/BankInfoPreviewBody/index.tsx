import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';
import { useTranslation } from "react-i18next";

export const BankInfoPreviewBody = (): JSX.Element => {
  const bankInfo = useTypedSelector((state) => state.userReducer.user?.bankInfo);
  const selectedEmployeeBankInfo = useTypedSelector((state) => state.employeeReducer.selectedEmployee?.bankInfo);
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? bankInfo : selectedEmployeeBankInfo;
  const { t } = useTranslation("employee-sidebar");

  return (
    <fieldset className={classNames('bank-info-preview-fields-wrapper')}>
      <SharedLabel title={t("bankName")}>
        <span>{currentDataOrigin?.bankName || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t("bankAccountNumber")}>
        <span>{currentDataOrigin?.bankAccountNumber || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
