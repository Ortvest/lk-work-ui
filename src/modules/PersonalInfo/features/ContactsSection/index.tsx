import { Fragment } from 'react';

import classNames from 'classnames';

import { EmailField } from '@modules/PersonalInfo/features/PersonalInfoSection/EmailField';
import { PhoneNumberFields } from '@modules/PersonalInfo/features/PersonalInfoSection/PhoneNumberFields';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';
import { useTranslation } from "react-i18next";

export const ContactSection = (): JSX.Element => {
  const {t} = useTranslation("employee-sidebar")
  return (
    <Fragment>
      <SharedSectionHeader title={t('contacts')} subtitle={t('contactsSubtitle')} />
      <fieldset className={classNames('contacts-fields-wrapper')}>
        <PhoneNumberFields
          prefixName="nationalPhoneNumber.prefix"
          numberName="nationalPhoneNumber.number"
          phoneNumberTitle={t("nationalPhoneNumber")}
          editModeTitle="nationalPhoneNumber"
        />
        <PhoneNumberFields
          prefixName="polishPhoneNumber.prefix"
          numberName="polishPhoneNumber.number"
          phoneNumberTitle={t("polishPhoneNumber")}
          editModeTitle="polishPhoneNumber"
        />
        <EmailField />
      </fieldset>
    </Fragment>
  );
};
