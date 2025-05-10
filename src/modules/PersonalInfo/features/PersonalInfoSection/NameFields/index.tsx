import { Fragment } from 'react';

import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

export const NameFields = (): JSX.Element => {
  const { register } = useFormContext();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);
  return (
    <Fragment>
      {isEditModeEnabled ? (
        <Fragment>
          <SharedLabel title="First name:*">
            <SharedInput type="text" {...register('firstName')} placeholder="Enter your first name..." />
          </SharedLabel>
          <SharedLabel title="Last name:*">
            <SharedInput type="text" {...register('lastName')} placeholder="Enter your last name..." />
          </SharedLabel>
        </Fragment>
      ) : (
        <Fragment>
          <SharedLabel title="First name:*">
            <span>{personalInfo?.firstName || '-'}</span>
          </SharedLabel>
          <SharedLabel title="Last name:*">
            <span>{personalInfo?.lastName || '-'}</span>
          </SharedLabel>
        </Fragment>
      )}
    </Fragment>
  );
};
