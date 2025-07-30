import classNames from 'classnames';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';

import './style.css';

export const StudentFields = (): JSX.Element => {
  return (
    <div className={classNames('questionnaire-student-info-wrapper')}>
      <SharedBooleanSelector name="isStudent" label="Student:*" />
    </div>
  );
};
