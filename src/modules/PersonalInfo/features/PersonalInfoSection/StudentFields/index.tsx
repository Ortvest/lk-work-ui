import { Fragment } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const StudentFields = (): JSX.Element => {
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  return (
    <div className={classNames('student-info-wrapper')}>
      {isEditModeEnabled ? (
        <Fragment>
          <SharedBooleanSelector name="isStudent" label="Student:*" />
        </Fragment>
      ) : (
        <Fragment>
          <SharedLabel title="Student:">
            <span> {personalInfo?.isStudent ? 'Yes' : 'No'}</span>
          </SharedLabel>
        </Fragment>
      )}
    </div>
  );
};
