import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { companies, positions } from '@shared/mocks/JobInfo.mocks';

export const JobInfoFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('job-info-form-fields-wrapper')}>
      <SharedLabel title="Company:">
        <SharedSelect {...register('company')} options={companies} />
      </SharedLabel>
      <SharedLabel title="Position:">
        <SharedSelect {...register('position')} options={positions} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle="Date of Commencement:" namePrefix="employmentStartDate" />
      <SharedDateSelector dateSelectorTitle="Date of Completion:" namePrefix="employmentEndDate" />
    </fieldset>
  );
};
