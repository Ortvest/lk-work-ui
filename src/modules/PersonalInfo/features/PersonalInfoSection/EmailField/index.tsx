import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import { UserRoles } from '@shared/enums/user.enums';

export const EmailField = (): JSX.Element => {
  const { register } = useFormContext();
  const { t } = useTranslation('employee-sidebar');
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);

  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  return (
    <SharedLabel title={t('email')}>
      {isEditModeEnabled ? (
        <SharedInput type="email" {...register('email')} placeholder={t('placeholderFirstEmail')} />
      ) : (
        <span>{currentDataOrigin?.email || '-'}</span>
      )}
    </SharedLabel>
  );
};
