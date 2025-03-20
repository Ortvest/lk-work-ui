import classNames from 'classnames';

import { Status } from '@modules/StatusPanel/layout/Status';

import './style.css';

export const StatusPanel = (): JSX.Element => {
  return (
    <section className={classNames('status-panel')}>
      <Status />
    </section>
  );
};
