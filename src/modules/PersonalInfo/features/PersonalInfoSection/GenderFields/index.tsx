import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const GenderFields = (): JSX.Element => {
  const { register, setValue, watch } = useFormContext();
  const [selectedGender, setSelectedGender] = useState<string | null>('male');

  const gender = watch('gender');
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  useEffect(() => {
    setSelectedGender(gender);
  }, [gender]);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedGender(event.target.value);
    setValue('gender', event.target.value);
  };

  return (
    <SharedLabel title="Gender:*">
      {isEditModeEnabled ? (
        <div className={classNames('gender-options')}>
          <label className={classNames('gender-option', { active: selectedGender === 'male' })}>
            <input
              type="radio"
              value="male"
              {...register('gender')}
              checked={selectedGender === 'male'}
              onChange={handleGenderChange}
            />
            Male
          </label>
          <label className={classNames('gender-option', { active: selectedGender === 'female' })}>
            <input
              type="radio"
              value="female"
              {...register('gender')}
              checked={selectedGender === 'female'}
              onChange={handleGenderChange}
            />
            Female
          </label>
        </div>
      ) : (
        <span className={classNames('gender-value')}>{currentDataOrigin?.gender || '-'}</span>
      )}
    </SharedLabel>
  );
};
