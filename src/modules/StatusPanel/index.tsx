import classNames from 'classnames';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { Status } from '@modules/StatusPanel/layout/Status';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedButton } from '@shared/components/SharedButton';

import './style.css';

import { UserDocumentsStatuses, UserRoles } from '@shared/enums/user.enums';
import { useTranslation } from "react-i18next";

export const StatusPanel = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const {t} = useTranslation('employee-sidebar');
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const userDocumentsStatus = useTypedSelector((state) => state.userReducer.user?.documentStatus);
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const shouldShowEditOrSaveButton =
    (userRole === UserRoles.EMPLOYEE && userDocumentsStatus === UserDocumentsStatuses.WAITING_FOR_BRIEFING) ||
    userRole === UserRoles.OFFICE_WORKER ||
    userRole === UserRoles.SUPER_ADMIN;

  const onEditModeToggleHanlder = (e: React.MouseEvent): void => {
    e.preventDefault();
    dispatch(setIsEditModeEnabled(true));
  };

  return (
    <section className={classNames('status-panel')}>
      <div className={classNames('status-panel-wrapper')}>
        <Status />
        {shouldShowEditOrSaveButton &&
          (isEditModeEnabled ? (
              <SharedButton type="submit" text={t("buttonSave")} />
            ) : (
              <SharedButton type="button" text={t('buttonEdit')} onClick={onEditModeToggleHanlder} />
          ))}
      </div>
    </section>
  );
};
