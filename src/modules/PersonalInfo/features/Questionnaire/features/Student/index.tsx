import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';
import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';

export const Student = (): JSX.Element => {
  const { watch, register } = useFormContext();

  const isStudent = watch('studentData.isStudent');

  return (
    <div className={classNames('student-info-wrapper')}>
      <SharedBooleanSelector name="studentData.isStudent" label="Student:*" />
      <SharedDateSelector dateSelectorTitle="Validity Period:*" namePrefix="studentData.validityPeriod" />
      {isStudent ? (
        <Fragment>
          <SharedFileUpload {...register('studentCardFrontSide')} title="Student Card - Front Side" />
          <SharedFileUpload {...register('studentCardBackSide')} title="Student Card - Back Side" />
          <SharedFileUpload {...register('educationalInstitution')} title="Document from an educational institution" />
        </Fragment>
      ) : null}
    </div>
  );
};
