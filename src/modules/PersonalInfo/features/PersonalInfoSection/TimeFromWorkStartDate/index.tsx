import { Fragment } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const TimeFromWorkStartDate = (): JSX.Element => {
  const userData = useTypedSelector((state) => state.userReducer.user);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  return (
    <Fragment>
      {!isEditModeEnabled ? (
        <div className={classNames('work-start-day-wrapper')}>
          <SharedLabel title="Time from work start date:">
            <span>{userData?.personalInfo.timeFromWorkStartDate as string} days</span>
          </SharedLabel>
        </div>
      ) : null}
    </Fragment>
  );
};
