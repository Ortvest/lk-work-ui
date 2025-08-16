import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';
import { useTranslation } from "react-i18next";

export const CheckBoxField = (): JSX.Element => {
  const {t} = useTranslation("employee-sidebar")
  const { register } = useFormContext();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const userData = useTypedSelector((state) => state.userReducer.user);
  const selectedEmployeeUserData = useTypedSelector((state) => state.employeeReducer.selectedEmployee);

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? userData : selectedEmployeeUserData;
  return (
    <Fragment>
      {isEditModeEnabled ? (
        <section className={classNames('checkbox-wrapper')}>
          <label className={classNames('checkbox-label')}>
            <input className={classNames('checkbox-input')} type="checkbox" {...register('consentToEmailPIT')} />
            <span>Consent to send the PIT by e-mail</span>
          </label>
        </section>
      ) : (
        <div className={classNames('email-consert-wrapper')}>
          <SharedLabel title={t("consentToSendPit")}>
            <span>{currentDataOrigin?.consentToEmailPIT ? t("yes") : t("no")}</span>
          </SharedLabel>
        </div>
      )}
    </Fragment>
  );
};
