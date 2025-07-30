import { useFormContext } from 'react-hook-form';

import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import { citizenshipMock } from '@shared/mocks/Citizenship.mocks';

export const NationalityField = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <SharedLabel title="Nationality:*">
      <SharedSelect {...register('nationality')} options={citizenshipMock} />
    </SharedLabel>
  );
};
