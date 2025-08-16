import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import { citizenshipMock } from '@shared/mocks/Citizenship.mocks';

export const NationalityField = (): JSX.Element => {
  const { register } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <SharedLabel title={t('nationality')}>
      <SharedSelect {...register('nationality')} options={citizenshipMock} />
    </SharedLabel>
  );
};
