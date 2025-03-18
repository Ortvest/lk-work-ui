import classNames from 'classnames';

import './style.css';

export const PersonalInfoHeader = (): JSX.Element => {
  return (
    <header className={classNames('personal-info-header')}>
      <h2 className={classNames('personal-info-title')}>Personal info</h2>
      <p className={classNames('personal-info-subtitle')}>Niewielki opis funkcji strony</p>
    </header>
  );
};
