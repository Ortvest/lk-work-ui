import { Fragment } from 'react';

import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import { UserRoles } from '@shared/enums/user.enums';

export const NameFields = (): JSX.Element => {
  const { register } = useFormContext();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  return (
    <Fragment>
      {isEditModeEnabled ? (
        <Fragment>
          <SharedLabel title="First name:*">
            <SharedInput type="text" {...register('firstName')} placeholder="Enter your first name..." />
          </SharedLabel>
          <SharedLabel title="Last name:*">
            <SharedInput type="text" {...register('lastName')} placeholder="Enter your last name..." />
          </SharedLabel>
        </Fragment>
      ) : (
        <Fragment>
          <SharedLabel title="First name:*">
            <span>{currentDataOrigin?.firstName || '-'}</span>
          </SharedLabel>
          <SharedLabel title="Last name:*">
            <span>{currentDataOrigin?.lastName || '-'}</span>
          </SharedLabel>
        </Fragment>
      )}
    </Fragment>
  );
};
