import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';

import './style.css';

interface PhoneNumberProps {
  prefixName: string;
  numberName: string;
  title: string;
}

export const PhoneNumberFields = ({ prefixName, numberName, title }: PhoneNumberProps): JSX.Element => {
  const { register } = useFormContext();
  return (
    <label className={classNames('field-label')}>
      {title}
      <fieldset className={classNames('phone-wrapper')}>
        <select className={classNames('phone-select')} {...register(prefixName)}>
          <option className={classNames('phone-option')} value="+48">
            +48
          </option>
          <option className={classNames('phone-option')} value="+38">
            +38
          </option>
        </select>
        <SharedInput type="tel" {...register(numberName)} placeholder="00 000 00 00" />
      </fieldset>
    </label>
  );
};
