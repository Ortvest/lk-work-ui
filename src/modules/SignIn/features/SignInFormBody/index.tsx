import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedButton } from '@shared/components/SharedButton';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const SignInFormBody = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <fieldset className={classNames('sign-in-fields-wrapper')}>
      <SharedLabel title="Email:">
        <SharedInput type="email" placeholder="Enter your email here..." {...register('email')} />
      </SharedLabel>
      <SharedLabel title="Passoword:">
        <SharedInput type="password" placeholder="Enter your passoword here..." {...register('password')} />
      </SharedLabel>
      <SharedButton type="submit" text="Enter to system" />
    </fieldset>
  );
};
