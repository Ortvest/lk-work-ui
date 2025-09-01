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
  register?: ReturnType<any>;
}

export const SharedSelect = forwardRef<HTMLSelectElement, SharedSelectProps>(
  ({ options, register, className, ...props }, ref) => {
    return (
      <select ref={ref} className={classNames('shared-select', className)} {...props} {...(register ?? {})}>
        <option value="" disabled selected hidden>
          Select an option
        </option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    );
  }
);

SharedSelect.displayName = 'SharedSelect';
