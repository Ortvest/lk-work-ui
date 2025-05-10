import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

export const EmailField = (): JSX.Element => {
  const { register } = useFormContext();
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  return (
    <SharedLabel title="Email:*">
      {isEditModeEnabled ? (
        <SharedInput type="email" {...register('email')} placeholder="Enter your first email..." />
      ) : (
        <span>{personalInfo?.email || '-'}</span>
      )}
    </SharedLabel>
  );
};
