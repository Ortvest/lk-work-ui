import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';
import { usePhonePrefixes } from '@shared/hooks/usePhonePrefixes';

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
                                  }: PhoneNumberProps): JSX.Element => {
  const { register, setValue, watch } = useFormContext();
  const { prefixes, loading, error } = usePhonePrefixes();

  const currentValue = watch(prefixName);
  const [selectedPrefix, setSelectedPrefix] = useState(currentValue || '');

  // синхронизируем с формой
  useEffect(() => {
    if (selectedPrefix) {
      setValue(prefixName, selectedPrefix);
    }
  }, [selectedPrefix, setValue, prefixName]);

  return (
    <SharedLabel title={phoneNumberTitle}>
      <fieldset className={classNames('questionnaire-phone-wrapper')}>
        <div className="questionnaire-phone-select-wrapper">
          <select
            className="questionnaire-phone-select"
            value={selectedPrefix}
            onChange={(e) => setSelectedPrefix(e.target.value)}
          >
            {loading && <option>Loading...</option>}
            {error && <option>Error loading</option>}
            {!loading &&
              !error &&
              prefixes.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.country} ({p.code})
                </option>
              ))}
          </select>
          <span className="questionnaire-phone-select-overlay">
            {selectedPrefix || '+'}
          </span>
        </div>
        <SharedInput type="tel" {...register(numberName)} placeholder="00 000 00 00" />
      </fieldset>
    </SharedLabel>
  );
};
