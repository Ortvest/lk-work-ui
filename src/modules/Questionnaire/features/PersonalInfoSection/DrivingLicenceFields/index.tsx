import { Fragment } from 'react';

import classNames from 'classnames';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';

import './style.css';

export const DrivingLicenceFields = (): JSX.Element => {
  return (
    <div className={classNames('questionnaire-driving-licence-wrapper')}>
      <Fragment>
        <SharedBooleanSelector name="hasDrivingLicence" label="Driving Licence:*" />
      </Fragment>
    </div>
  );
};
