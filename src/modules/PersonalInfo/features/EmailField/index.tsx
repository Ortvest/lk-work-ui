import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

export const EmailField = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <SharedLabel>
      Email:*
      <SharedInput type="email" {...register('email')} placeholder="Enter your first email..." />
    </SharedLabel>
  );
};
