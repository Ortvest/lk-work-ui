import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import './style.css';

export const CheckBoxField = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <section className={classNames('checkbox-wrapper')}>
      <label className={classNames('checkbox-label')}>
        <input className={classNames('checkbox-input')} type="checkbox" {...register('emailAgreement')} />
        <span>Consent to send the PIT by e-mail</span>
      </label>
    </section>
  );
};
