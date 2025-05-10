import classNames from 'classnames';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';

export const Student = (): JSX.Element => {
  return (
    <div className={classNames('student-info-wrapper')}>
      <SharedBooleanSelector name="isStudent" label="Student:*" />
    </div>
  );
};
