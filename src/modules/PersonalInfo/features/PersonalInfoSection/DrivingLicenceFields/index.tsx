import { Fragment } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const DrivingLicenceFields = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  return (
    <div className={classNames('driving-licence-wrapper')}>
      {isEditModeEnabled ? (
        <Fragment>
          <SharedBooleanSelector name="hasDrivingLicence" label={t('drivingLicence')} />
        </Fragment>
      ) : (
        <Fragment>
          <SharedLabel title={t('drivingLicence')}>
            <span>{currentDataOrigin?.hasDrivingLicence ? t('yes') : t('no')}</span>
          </SharedLabel>
        </Fragment>
      )}
    </div>
  );
};
