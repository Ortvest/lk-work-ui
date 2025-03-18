import { forwardRef, InputHTMLAttributes } from 'react';

type SharedInputProps = InputHTMLAttributes<HTMLInputElement>;

import classNames from 'classnames';

import './style.css';

export const SharedInput = forwardRef<HTMLInputElement, SharedInputProps>(({ ...props }, ref) => {
  return <input ref={ref} className={classNames('field-input')} {...props} />;
});

SharedInput.displayName = 'SharedInput';
