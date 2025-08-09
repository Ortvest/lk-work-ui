import { Fragment } from 'react';

import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import { UserRoles } from '@shared/enums/user.enums';

export const DocumentsNumberField = (): JSX.Element => {
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
      <SharedLabel title="Passport Number:*">
        {isEditModeEnabled ? (
          <SharedInput type="text" {...register('passportNumber')} placeholder="Enter your passport number..." />
        ) : (
          <span>{currentDataOrigin?.passportNumber || '-'}</span>
        )}
      </SharedLabel>
      <SharedLabel title="PESEL Number:*">
        {isEditModeEnabled ? (
          <SharedInput
            type="text"
            maxLength={11}
            {...register('peselNumber')}
            placeholder="Enter your pesel number..."
          />
        ) : (
          <span>{currentDataOrigin?.peselNumber || '-'}</span>
        )}
      </SharedLabel>
    </Fragment>
  );
};
