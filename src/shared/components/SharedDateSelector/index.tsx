import { Fragment } from 'react';

import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

interface SharedDateSelectorProps {
  dateSelectorTitle: string;
  namePrefix: string;
}

export const SharedDateSelector = ({ dateSelectorTitle, namePrefix }: SharedDateSelectorProps): JSX.Element => {
  const { control } = useFormContext();

  return (
    <Fragment>
      <SharedLabel title={dateSelectorTitle}>
        <fieldset className={classNames('date-selector-fields-wrapper')}>
          <Controller
            name={`${namePrefix}.year`}
            control={control}
            render={({ field }) => (
              <select {...field} className={classNames('date-select')} name={`${namePrefix}.year`}>
                <option value="">YYYY</option>
                {Array.from({ length: 50 }, (_, index) => new Date().getFullYear() - index).map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          />
          <Controller
            name={`${namePrefix}.month`}
            control={control}
            render={({ field }) => (
              <select {...field} className={classNames('date-select')} name={`${namePrefix}.month`}>
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                  <option key={month} value={String(month)}>
                    {month}
                  </option>
                ))}
              </select>
            )}
          />
          <Controller
            name={`${namePrefix}.day`}
            control={control}
            render={({ field }) => (
              <select {...field} className={classNames('date-select')} name={`${namePrefix}.day`}>
                <option value="">DD</option>
                {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                  <option key={day} value={String(day)}>
                    {day}
                  </option>
                ))}
              </select>
            )}
          />
        </fieldset>
      </SharedLabel>
    </Fragment>
  );
};
