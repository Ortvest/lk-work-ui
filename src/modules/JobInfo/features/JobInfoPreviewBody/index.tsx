import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';
import { useTranslation } from 'react-i18next';

export const JobInfoPreviewBody = (): JSX.Element => {
  const jobInfo = useTypedSelector((state) => state.userReducer.user?.jobInfo);
  const selectedEmployeeJobInfo = useTypedSelector((state) => state.employeeReducer.selectedEmployee?.jobInfo);

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const { t } = useTranslation("employee-sidebar");

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? jobInfo : selectedEmployeeJobInfo;

  return (
    <fieldset className={classNames('job-info-preview-fields-wrapper')}>
      <SharedLabel title={t("jobCompany")}>
        <span>{currentDataOrigin?.company || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t("jobPosition")}>
        <span>{currentDataOrigin?.position || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t("jobDateOfCommencement")}>
        <span>{(currentDataOrigin?.employmentStartDate as string) || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t("jobDateOfCompletion")}>
        <span>{(currentDataOrigin?.employmentEndDate as string) || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
