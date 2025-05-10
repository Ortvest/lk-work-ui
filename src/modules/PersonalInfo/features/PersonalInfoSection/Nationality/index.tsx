import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { citizenshipMock } from '@shared/mocks/Citizenship.mocks';

export const NationalityField = (): JSX.Element => {
  const { register } = useFormContext();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  return (
    <SharedLabel title="Nationality:*">
      {isEditModeEnabled ? (
        <SharedSelect {...register('nationality')} options={citizenshipMock} />
      ) : (
        <span className={classNames('nationality-text')}>{personalInfo?.nationality || '-'}</span>
      )}
    </SharedLabel>
  );
};
