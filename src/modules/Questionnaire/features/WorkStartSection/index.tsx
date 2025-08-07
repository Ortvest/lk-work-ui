import { Fragment } from 'react';

import classNames from 'classnames';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

export const WorkStartSection = (): JSX.Element => {
  return (
    <Fragment>
      <SharedSectionHeader
        title="When can you start work?"
        subtitle="Indicate when you are ready to start working and your preferences"
      />
      <fieldset className={classNames('questionnaire-work-start-fields-wrapper')}>
        <SharedDateSelector dateSelectorTitle="Pick date:*" namePrefix="timeFromWorkStartDate" />
      </fieldset>
    </Fragment>
  );
};
