import classNames from 'classnames';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedDateSelector } from '@shared/components/SharedDateSelector';

import './style.css';

export const DrivingLicenceFields = (): JSX.Element => {
  return (
    <div className={classNames('driving-licence-wrapper')}>
      <SharedBooleanSelector name="drivingLicenceData.isDrivingLicence" label="Driving Licence:*" />
      <SharedDateSelector
        dateSelectorTitle="Driving Licence Validity Period:*"
        namePrefix="drivingLicenceData.validityPeriod"
      />
    </div>
  );
};
