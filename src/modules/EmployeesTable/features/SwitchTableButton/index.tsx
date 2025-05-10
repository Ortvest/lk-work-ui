import React from 'react';

import classNames from 'classnames';

import './style.css';

interface SwitchTableButtonProps {
  text: string;
  isActive: boolean;
  setSelectedTable: (selectedTable: 'hired' | 'fired') => void;
}
export const SwitchTableButton = ({ text, isActive, setSelectedTable }: SwitchTableButtonProps): React.ReactNode => {
  const onSetSelectedTable = (): void => {
    if (text === 'Fired') {
      setSelectedTable('fired');
    } else {
      setSelectedTable('hired');
    }
  };
  return (
    <button onClick={onSetSelectedTable} className={classNames('switch-table-button', { active: isActive })}>
      {text}
    </button>
  );
};
