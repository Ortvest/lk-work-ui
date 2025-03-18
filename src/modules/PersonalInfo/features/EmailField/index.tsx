import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';

export const EmailField = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <label className={classNames('field-label')}>
      Email:*
      <SharedInput type="email" {...register('email')} placeholder="Enter your first email..." />
    </label>
  );
};
