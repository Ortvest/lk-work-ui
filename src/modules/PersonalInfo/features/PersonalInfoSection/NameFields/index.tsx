import { Fragment } from 'react';

import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import { UserRoles } from '@shared/enums/user.enums';
import { useTranslation } from "react-i18next";

export const NameFields = (): JSX.Element => {
  const { register } = useFormContext();
  const {t} = useTranslation("employee-sidebar")
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
          <SharedLabel title={t("firstName")}>
            <SharedInput type="text" {...register('firstName')} placeholder={t("enterFirstNamePlaceholder")} />
          </SharedLabel>
          <SharedLabel title={t("lastName")}>
            <SharedInput type="text" {...register('lastName')} placeholder={t("enterLastNamePlaceholder")} />
          </SharedLabel>
        </Fragment>
      ) : (
        <Fragment>
          <SharedLabel title={t("firstName")}>
            <span>{currentDataOrigin?.firstName || '-'}</span>
          </SharedLabel>
          <SharedLabel title={t("lastName")}>
            <span>{currentDataOrigin?.lastName || '-'}</span>
          </SharedLabel>
        </Fragment>
      )}
    </Fragment>
  );
};
