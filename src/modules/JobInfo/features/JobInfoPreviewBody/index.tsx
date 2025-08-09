import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const JobInfoPreviewBody = (): JSX.Element => {
  const jobInfo = useTypedSelector((state) => state.userReducer.user?.jobInfo);
  const selectedEmployeeJobInfo = useTypedSelector((state) => state.employeeReducer.selectedEmployee?.jobInfo);

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? jobInfo : selectedEmployeeJobInfo;
  return (
    <fieldset className={classNames('job-info-preview-fields-wrapper')}>
      <SharedLabel title="Company:">
        <span>{currentDataOrigin?.company || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Position:">
        <span>{currentDataOrigin?.position || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of Commencement:">
        <span>{(currentDataOrigin?.employmentStartDate as string) || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of Completion:">
        <span>{(currentDataOrigin?.employmentEndDate as string) || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
