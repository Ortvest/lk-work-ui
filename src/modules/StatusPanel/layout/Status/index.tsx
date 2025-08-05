import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './style.css';

import { UserDocumentsStatuses } from '@shared/enums/user.enums';

export const Status = (): JSX.Element => {
  const documentStatus = useTypedSelector((state) => state.userReducer.user?.documentStatus);
  const documentStatusConfig: Record<
    (typeof UserDocumentsStatuses)[keyof typeof UserDocumentsStatuses],
    { text: string; className: string }
  > = {
    [UserDocumentsStatuses.WAITING_FOR_BRIEFING]: {
      text: 'Waiting for briefing',
      className: 'status-waiting',
    },
    [UserDocumentsStatuses.TO_CONFIRM]: {
      text: 'Checking',
      className: 'status-to-confirm',
    },
    [UserDocumentsStatuses.WAITING_FOR_DOCS]: {
      text: 'Need update',
      className: 'status-waiting-docs',
    },
    [UserDocumentsStatuses.CONFIRMED]: {
      text: 'Confirmed',
      className: 'status-confirmed',
    },
  };
  return (
    <div className={classNames('status-panel-value')}>
      Status:
      <div>
        <p className={classNames('user-docs-status', documentStatusConfig[documentStatus!]?.className)}>
          {documentStatusConfig[documentStatus!]?.text ?? 'Unknown'}
        </p>
      </div>
    </div>
  );
};
