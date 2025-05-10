import { Fragment } from 'react';

import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

export const DocumentsNumberField = (): JSX.Element => {
  const { register } = useFormContext();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  return (
    <Fragment>
      <SharedLabel title="Passport Number:*">
        {isEditModeEnabled ? (
          <SharedInput type="text" {...register('passportNumber')} placeholder="Enter your passport number..." />
        ) : (
          <span>{personalInfo?.passportNumber || '-'}</span>
        )}
      </SharedLabel>
      <SharedLabel title="PESEL Number:*">
        {isEditModeEnabled ? (
          <SharedInput
            type="text"
            maxLength={11}
            {...register('peselNumber')}
            placeholder="Enter your pesel number..."
          />
        ) : (
          <span>{personalInfo?.peselNumber || '-'}</span>
        )}
      </SharedLabel>
    </Fragment>
  );
};
