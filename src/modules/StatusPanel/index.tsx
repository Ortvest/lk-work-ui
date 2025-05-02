import classNames from 'classnames';

import { Status } from '@modules/StatusPanel/layout/Status';

import { SharedButton } from '@shared/components/SharedButton';

import './style.css';

export const StatusPanel = (): JSX.Element => {
  return (
    <section className={classNames('status-panel')}>
      <div className={classNames('status-panel-wrapper')}>
        <Status />
        <SharedButton type="submit" text="Save" />
      </div>
    </section>
  );
};
