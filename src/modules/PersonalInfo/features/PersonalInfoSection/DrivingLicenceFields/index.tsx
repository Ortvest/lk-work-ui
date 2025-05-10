import { Fragment } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const DrivingLicenceFields = (): JSX.Element => {
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  return (
    <div className={classNames('driving-licence-wrapper')}>
      {isEditModeEnabled ? (
        <Fragment>
          <SharedBooleanSelector name="hasDrivingLicence" label="Driving Licence:*" />
        </Fragment>
      ) : (
        <Fragment>
          <SharedLabel title="Driving Licence:">
            <span>{personalInfo?.hasDrivingLicence ? 'Yes' : 'No'}</span>
          </SharedLabel>
        </Fragment>
      )}
    </div>
  );
};
