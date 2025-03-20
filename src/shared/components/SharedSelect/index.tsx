import { forwardRef, SelectHTMLAttributes } from 'react';

import classNames from 'classnames';

import './style.css';

interface Option {
  value: string;
  label: string;
}

interface SharedSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  className?: string;
}

export const SharedSelect = forwardRef<HTMLSelectElement, SharedSelectProps>(
  ({ options, className, ...props }, ref) => {
    return (
      <select ref={ref} className={classNames('shared-select', className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

SharedSelect.displayName = 'SharedSelect';
