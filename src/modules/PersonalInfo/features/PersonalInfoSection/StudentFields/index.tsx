import classNames from 'classnames';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedDateSelector } from '@shared/components/SharedDateSelector';

import './style.css';

export const StudentFields = (): JSX.Element => {
  return (
    <div className={classNames('student-info-wrapper')}>
      <SharedBooleanSelector name="studentData.isStudent" label="Student:*" />
      <SharedDateSelector dateSelectorTitle="Validity Period:*" namePrefix="studentData.validityPeriod" />
    </div>
  );
};
