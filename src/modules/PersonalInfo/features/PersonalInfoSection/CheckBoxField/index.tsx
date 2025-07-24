import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const CheckBoxField = (): JSX.Element => {
  const { register } = useFormContext();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const userData = useTypedSelector((state) => state.userReducer.user);

  return (
    <Fragment>
      {isEditModeEnabled ? (
        <section className={classNames('checkbox-wrapper')}>
          <label className={classNames('checkbox-label')}>
            <input className={classNames('checkbox-input')} type="checkbox" {...register('consentToEmailPIT')} />
            <span>Consent to send the PIT by e-mail</span>
          </label>
        </section>
      ) : (
        <div className={classNames('email-consert-wrapper')}>
          <SharedLabel title="Consent to send the PIT by e-mail:">
            <span>{userData?.consentToEmailPIT ? 'Yes' : 'No'}</span>
          </SharedLabel>
        </div>
      )}
    </Fragment>
  );
};
