import { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SharedInput } from '@shared/components/SharedInput';
import { SharedLabel } from '@shared/components/SharedLabel';

export const DocumentsNumberField = (): JSX.Element => {
  const { register } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <Fragment>
      <SharedLabel title={t('passportNumber')}>
        <SharedInput
          type="text"
          {...register('passportNumber')}
          placeholder={t('passportPlaceholder')}
        />
      </SharedLabel>

      <SharedLabel title={t('peselNumber')}>
        <SharedInput
          type="text"
          maxLength={11}
          {...register('peselNumber')}
          placeholder={t('peselPlaceholder')}
        />
      </SharedLabel>
    </Fragment>
  );
};
