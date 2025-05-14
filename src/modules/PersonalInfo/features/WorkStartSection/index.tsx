import { Fragment } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

export const WorkStartSection = (): JSX.Element => {
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);
  return (
    <Fragment>
      <SharedSectionHeader
        title="When can you start work?"
        subtitle="Indicate when you are ready to start working and your preferences"
      />
      <fieldset className={classNames('work-start-fields-wrapper')}>
        {isEditModeEnabled ? (
          <SharedDateSelector dateSelectorTitle="Pick date:*" namePrefix="timeFromWorkStartDate" />
        ) : (
          <SharedLabel title="When can you start work:">
            <span>{(personalInfo?.timeFromWorkStartDate as string) || '-'}</span>
          </SharedLabel>
        )}
      </fieldset>
    </Fragment>
  );
};
