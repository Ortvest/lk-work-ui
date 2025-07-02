import React from 'react';

import classNames from 'classnames';

import './style.css';

interface SwitchTableButtonProps {
  text: string;
  isActive: boolean;
  setSelectedTable: (selectedTable: 'hired' | 'fired' | 'vacation-requests') => void;
}
export const SwitchTableButton = ({ text, isActive, setSelectedTable }: SwitchTableButtonProps): React.ReactNode => {
  const onSetSelectedTable = (): void => {
    switch (text) {
      case 'Hired':
        setSelectedTable('hired');
        break;
      case 'Fired':
        setSelectedTable('fired');
        break;
      case 'Vacation-requests':
        setSelectedTable('vacation-requests');
        break;
      default:
        setSelectedTable('fired');
    }
    if (text === 'Fired') {
      setSelectedTable('fired');
    } else if (text === 'Hired') {
      setSelectedTable('hired');
    } else {
      setSelectedTable('vacation-requests');
    }
  };
  return (
    <button onClick={onSetSelectedTable} className={classNames('switch-table-button', { active: isActive })}>
      {text}
    </button>
  );
};
