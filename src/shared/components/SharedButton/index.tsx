import classNames from 'classnames';

import './style.css';

interface SharedButtonProps {
  type: 'submit' | 'reset' | 'button';
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}
export const SharedButton = ({ type, text, onClick }: SharedButtonProps): JSX.Element => {
  return (
    <button className={classNames('shared-button')} type={type} onClick={onClick}>
      {text}
    </button>
  );
};
