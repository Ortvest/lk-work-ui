import classNames from 'classnames';
import { Fragment } from 'react/jsx-runtime';
import { useFormContext } from 'react-hook-form';

import './style.css';

export const CheckBoxField = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <Fragment>
      <section className={classNames('questionnaire-checkbox-wrapper')}>
        <label className={classNames('questionnaire-checkbox-label')}>
          <input
            className={classNames('questionnaire-checkbox-input')}
            type="checkbox"
            {...register('consentToEmailPIT')}
          />
          <span>Consent to send the PIT by e-mail</span>
        </label>
      </section>
    </Fragment>
  );
};
