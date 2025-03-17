import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@global/router/router.constans';

import './style.css';

export const Menu = (): JSX.Element => {
  return (
    <nav className={classNames('header-navigation')}>
      <ul className={classNames('header-navigation-list')}>
        <li className={classNames('header-navigation-item')}>
          <Link className={classNames('header-navigation-link')} to={AppRoutes.SUPPORT}>
            Support
          </Link>
        </li>
      </ul>
      <select className={classNames('header-navigation-select')} name="lang-switch">
        <option className={classNames('header-navigation-option')} value="eng">
          Eng
        </option>
        <option className={classNames('header-navigation-option')} value="pl">
          Pl
        </option>
      </select>
    </nav>
  );
};
