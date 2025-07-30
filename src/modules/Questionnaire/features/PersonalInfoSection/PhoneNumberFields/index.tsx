import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

interface PhoneNumberProps {
  prefixName: string;
  numberName: string;
  phoneNumberTitle: string;
  editModeTitle: 'polishPhoneNumber' | 'nationalPhoneNumber';
}

export const PhoneNumberFields = ({ prefixName, numberName, phoneNumberTitle }: PhoneNumberProps): JSX.Element => {
  const { register } = useFormContext();

  return (
    <SharedLabel title={phoneNumberTitle}>
      <fieldset className={classNames('questionnaire-phone-wrapper')}>
        <select className={classNames('questionnaire-phone-select')} {...register(prefixName)}>
          <option className={classNames('questionnaire-phone-option')} value="+48">
            +48
          </option>
          <option className={classNames('questionnaire-phone-option')} value="+38">
            +38
          </option>
        </select>
        <SharedInput type="tel" {...register(numberName)} placeholder="00 000 00 00" />
      </fieldset>
    </SharedLabel>
  );
};
