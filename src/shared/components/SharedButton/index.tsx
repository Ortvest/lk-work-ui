import React from 'react';

import classNames from 'classnames';

import './style.css';

interface SharedButtonProps {
  type: 'submit' | 'reset' | 'button';
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  sx?: React.CSSProperties;
}
export const SharedButton = ({ type, text, onClick, sx }: SharedButtonProps): JSX.Element => {
  return (
    <button className={classNames('shared-button')} style={sx} type={type} onClick={onClick}>
      {text}
    </button>
  );
};
