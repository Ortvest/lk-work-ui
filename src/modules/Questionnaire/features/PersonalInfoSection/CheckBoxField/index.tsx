import classNames from 'classnames';
import { Fragment } from 'react/jsx-runtime';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import './style.css';

export const CheckBoxField = (): JSX.Element => {
  const { register } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <Fragment>
      <section className={classNames('questionnaire-checkbox-wrapper')}>
        <label className={classNames('questionnaire-checkbox-label')}>
          <input
            className={classNames('questionnaire-checkbox-input')}
            type="checkbox"
            {...register('consentToEmailPIT')}
          />
          <span>{t('consentToSendPit')}</span>
        </label>
      </section>
    </Fragment>
  );
};
