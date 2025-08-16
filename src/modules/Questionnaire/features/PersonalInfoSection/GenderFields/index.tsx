import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

export const GenderFields = (): JSX.Element => {
  const { register, setValue, watch } = useFormContext();
  const { t } = useTranslation('employee-sidebar');
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
    <SharedLabel title={t('gender')}>
      <div className={classNames('questionnaire-gender-options')}>
        <label
          className={classNames('questionnaire-gender-option', {
            active: selectedGender === 'male',
          })}
        >
          <input
            type="radio"
            value="male"
            {...register('gender')}
            checked={selectedGender === 'male'}
            onChange={handleGenderChange}
          />
          {t('genderMale')}
        </label>
        <label
          className={classNames('questionnaire-gender-option', {
            active: selectedGender === 'female',
          })}
        >
          <input
            type="radio"
            value="female"
            {...register('gender')}
            checked={selectedGender === 'female'}
            onChange={handleGenderChange}
          />
          {t('genderFemale')}
        </label>
      </div>
    </SharedLabel>
  );
};
