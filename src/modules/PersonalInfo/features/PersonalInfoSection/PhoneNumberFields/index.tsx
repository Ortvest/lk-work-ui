import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

interface PhoneNumberProps {
  prefixName: string;
  numberName: string;
  phoneNumberTitle: string;
  editModeTitle: 'polishPhoneNumber' | 'nationalPhoneNumber';
}

export const PhoneNumberFields = ({
  prefixName,
  numberName,
  phoneNumberTitle,
  editModeTitle,
}: PhoneNumberProps): JSX.Element => {
  const { register } = useFormContext();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  return (
    <SharedLabel title={phoneNumberTitle}>
      {isEditModeEnabled ? (
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
      ) : (
        <span>{(personalInfo?.[editModeTitle] as string) || '-'}</span>
      )}
    </SharedLabel>
  );
};
