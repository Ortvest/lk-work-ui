import classNames from 'classnames';

import './style.css';

export const Status = (): JSX.Element => {
  const statusValue = 'Verification';

  return (
    <div className={classNames('status-panel-value')}>
      Status: <span className={classNames('status-panel-value-text')}>{statusValue}</span>
    </div>
  );
};
