import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { usePhonePrefixes } from '@shared/hooks/usePhonePrefixes';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

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
  const { register, setValue, watch } = useFormContext();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);
  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  const { prefixes, loading, error } = usePhonePrefixes();

  const currentValue = watch(prefixName);
  const [selectedPrefix, setSelectedPrefix] = useState(currentValue || '');

  useEffect(() => {
    if (selectedPrefix) {
      setValue(prefixName, selectedPrefix);
    }
  }, [selectedPrefix, setValue, prefixName]);

  return (
    <SharedLabel title={phoneNumberTitle}>
      {isEditModeEnabled ? (
        <fieldset className={classNames('phone-wrapper')}>
          <div className="phone-select-wrapper">
            <select className="phone-select" value={selectedPrefix} onChange={(e) => setSelectedPrefix(e.target.value)}>
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
            <span className="phone-select-overlay">{selectedPrefix || '+'}</span>
          </div>
          <SharedInput type="tel" {...register(numberName)} placeholder="00 000 00 00" />
        </fieldset>
      ) : (
        <span>{(currentDataOrigin?.[editModeTitle] as string) || '-'}</span>
      )}
    </SharedLabel>
  );
};
