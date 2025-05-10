import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const JobInfoPreviewBody = (): JSX.Element => {
  const jobInfo = useTypedSelector((state) => state.userReducer.user?.jobInfo);
  return (
    <fieldset className={classNames('job-info-preview-fields-wrapper')}>
      <SharedLabel title="Company:">
        <span>{jobInfo?.company || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Position:">
        <span>{jobInfo?.position || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of Commencement:">
        <span>{jobInfo?.employmentStartDate || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of Completion:">
        <span>{jobInfo?.employmentEndDate || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
