import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './style.css';

import { UserDocumentsStatuses, UserRoles } from '@shared/enums/user.enums';

export const Status = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');

  const documentStatus = useTypedSelector((state) => state.userReducer.user?.documentStatus);
  const selectedEmployeeDocumentsStatus = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documentStatus
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? documentStatus : selectedEmployeeDocumentsStatus;

  const documentStatusConfig: Record<
    (typeof UserDocumentsStatuses)[keyof typeof UserDocumentsStatuses],
    { key: string; className: string }
  > = {
    [UserDocumentsStatuses.WAITING_FOR_BRIEFING]: {
      key: 'statusWaitingForBriefing',
      className: 'status-waiting',
    },
    [UserDocumentsStatuses.TO_CONFIRM]: {
      key: 'statusToConfirm',
      className: 'status-to-confirm',
    },
    [UserDocumentsStatuses.WAITING_FOR_DOCS]: {
      key: 'statusWaitingForDocs',
      className: 'status-waiting-docs',
    },
    [UserDocumentsStatuses.CONFIRMED]: {
      key: 'statusConfirmed',
      className: 'status-confirmed',
    },
  };

  const statusKey = documentStatusConfig[currentDataOrigin!]?.key || 'statusUnknown';

  return (
    <div className={classNames('status-panel-value')}>
      {t('statusLabel')}:
      <div>
        <p className={classNames('user-docs-status', documentStatusConfig[currentDataOrigin!]?.className)}>
          {t(statusKey)}
        </p>
      </div>
    </div>
  );
};
