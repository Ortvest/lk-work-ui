import { Fragment } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';

import './style.css';

export const DrivingLicenceFields = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');

  return (
    <div className={classNames('questionnaire-driving-licence-wrapper')}>
      <Fragment>
        <SharedBooleanSelector name="hasDrivingLicence" label={t('drivingLicence')} />
      </Fragment>
    </div>
  );
};
