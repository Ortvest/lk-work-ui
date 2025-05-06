import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

interface SharedBooleanSelectorProps {
  name: string;
  label: string;
}

export const SharedBooleanSelector = ({ name, label }: SharedBooleanSelectorProps): JSX.Element => {
  const { control } = useFormContext();

  return (
    <SharedLabel title={label}>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: { value, onChange } }) => (
          <div className={classNames('select-options')}>
            <label className={classNames('select-option', { active: value === true })}>
              <input type="radio" value="true" checked={value} onChange={() => onChange(true)} />
              Yes
            </label>
            <label className={classNames('select-option', { active: value === false })}>
              <input type="radio" value="false" checked={!value} onChange={() => onChange(false)} />
              No
            </label>
          </div>
        )}
      />
    </SharedLabel>
  );
};
