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
            defaultValue="YYYY"
            render={({ field }) => (
              <select {...field} className={classNames('date-select')} name="year" value={field.value || 'YYYY'}>
                <option value="YYYY" disabled>
                  YYYY
                </option>
                {Array.from({ length: 50 }, (_, index: number) => new Date().getFullYear() - index).map(
                  (year: number) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            )}
          />
          <Controller
            name={`${namePrefix}.month`}
            control={control}
            defaultValue="MM"
            render={({ field }) => (
              <select {...field} className={classNames('date-select')} name="month" value={field.value || 'MM'}>
                <option value="MM" disabled>
                  MM
                </option>
                {Array.from({ length: 12 }, (_, index: number) => index + 1).map((month: number) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            )}
          />
          <Controller
            name={`${namePrefix}.day`}
            control={control}
            defaultValue="DD"
            render={({ field }) => (
              <select {...field} className={classNames('date-select')} name="day" value={field.value || 'DD'}>
                <option value="DD" disabled>
                  DD
                </option>
                {Array.from({ length: 31 }, (_, index: number) => index + 1).map((day: number) => (
                  <option key={day} value={day}>
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
