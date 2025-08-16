import { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

export const NameFields = (): JSX.Element => {
  const { register } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <Fragment>
      <SharedLabel title={t('firstName')}>
        <SharedInput
          type="text"
          {...register('firstName')}
          placeholder={t('enterFirstNamePlaceholder')}
        />
      </SharedLabel>
      <SharedLabel title={t('lastName')}>
        <SharedInput
          type="text"
          {...register('lastName')}
          placeholder={t('enterLastNamePlaceholder')}
        />
      </SharedLabel>
    </Fragment>
  );
};
