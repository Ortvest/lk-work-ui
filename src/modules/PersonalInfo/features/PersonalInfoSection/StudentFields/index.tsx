import { Fragment } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const StudentFields = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  return (
    <div className={classNames('student-info-wrapper')}>
      {isEditModeEnabled ? (
        <Fragment>
          <SharedBooleanSelector name="isStudent" label={t('student')} />
        </Fragment>
      ) : (
        <Fragment>
          <SharedLabel title={t('student')}>
            <span> {currentDataOrigin?.isStudent ? t('yes') : t('no')}</span>
          </SharedLabel>
        </Fragment>
      )}
    </div>
  );
};
