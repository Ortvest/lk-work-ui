import classNames from 'classnames';

import './style.css';

export const Status = (): JSX.Element => {
  const statusValue = 'Verification';

  return (
    <div className={classNames('status')}>
      Status: <span className={classNames('status-value')}>{statusValue}</span>
    </div>
  );
};
