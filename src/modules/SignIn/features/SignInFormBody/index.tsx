import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedButton } from '@shared/components/SharedButton';
import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';
import { useTranslation } from "react-i18next";

export const SignInFormBody = (): JSX.Element => {
  const { register } = useFormContext();
  const { t } = useTranslation('login');
  return (
    <fieldset className={classNames('sign-in-fields-wrapper')}>
      <SharedLabel title={`${t('emailLabel')}:`}>
        <SharedInput type="email" placeholder={t("emailPlaceholder")} {...register('email')} />
      </SharedLabel>
      <SharedLabel title={`${t('passwordLabel')}:`}>
        <SharedInput type="password" placeholder={t("passwordPlaceholder")} {...register('password')} />
      </SharedLabel>
      <SharedButton type="submit" text={t("signInButton")} />
    </fieldset>
  );
};
