import { useFormContext } from 'react-hook-form';

import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import { citizenshipMock } from '@shared/mocks/Citizenship.mocks';

export const CitizenshipField = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <SharedLabel title="Citizenship:*">
      <SharedSelect {...register('citizenship')} options={citizenshipMock} />
    </SharedLabel>
  );
};
