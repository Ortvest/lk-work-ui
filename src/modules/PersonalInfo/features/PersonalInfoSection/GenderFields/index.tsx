import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const GenderFields = (): JSX.Element => {
  const { register, setValue, watch } = useFormContext();
  const [selectedGender, setSelectedGender] = useState<string | null>('male');

  const gender = watch('gender');

  useEffect(() => {
    setSelectedGender(gender);
  }, [gender]);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedGender(event.target.value);
    setValue('gender', event.target.value);
  };

  return (
    <SharedLabel title="Gender:*">
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
    </SharedLabel>
  );
};
