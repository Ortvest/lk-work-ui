import { Fragment } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const TimeFromWorkStartDate = (): JSX.Element => {
  const userData = useTypedSelector((state) => state.userReducer.user);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const selectedEmployeeuserData = useTypedSelector((state) => state.employeeReducer.selectedEmployee);

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? userData : selectedEmployeeuserData;
  return (
    <Fragment>
      {!isEditModeEnabled ? (
        <div className={classNames('work-start-day-wrapper')}>
          <SharedLabel title="Time from work start date:">
            <span>{currentDataOrigin?.personalInfo.timeFromWorkStartDate as string} days</span>
          </SharedLabel>
        </div>
      ) : null}
    </Fragment>
  );
};
