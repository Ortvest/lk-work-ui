import classNames from 'classnames';

import './style.css';

interface SharedButtonProps {
  type: 'submit' | 'reset' | 'button';

  text: string;
}
export const SharedButton = ({ type, text }: SharedButtonProps): JSX.Element => {
  return (
    <button className={classNames('shared-button')} type={type}>
      {text}
    </button>
  );
};
