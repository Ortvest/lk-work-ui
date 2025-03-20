import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constans';

import './style.css';

export const Logo = (): JSX.Element => {
  return (
    <div className={classNames('header-logo')}>
      <Link className={classNames('header-logo-link')} to={AppRoutes.PERSONAL_INFO.path}>
        Logo
      </Link>
    </div>
  );
};
