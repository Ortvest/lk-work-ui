import { Fragment } from 'react';

import classNames from 'classnames';

import { EmailField } from '@modules/PersonalInfo/features/PersonalInfoSection/EmailField';
import { PhoneNumberFields } from '@modules/PersonalInfo/features/PersonalInfoSection/PhoneNumberFields';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

export const ContactSection = (): JSX.Element => {
  return (
    <Fragment>
      <SharedSectionHeader title="Contacts" subtitle="Full Correspondence Address" />
      <fieldset className={classNames('contacts-fields-wrapper')}>
        <PhoneNumberFields
          prefixName="nationalPhoneNumber.prefix"
          numberName="nationalPhoneNumber.number"
          phoneNumberTitle="National Phone Number:*"
          editModeTitle="nationalPhoneNumber"
        />
        <PhoneNumberFields
          prefixName="polishPhoneNumber.prefix"
          numberName="polishPhoneNumber.number"
          phoneNumberTitle="Polish Phone number:"
          editModeTitle="polishPhoneNumber"
        />
        {location.pathname === '/questionnaire' ? null : <EmailField />}
      </fieldset>
    </Fragment>
  );
};
