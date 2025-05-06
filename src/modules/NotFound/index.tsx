import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './style.css';

export const NotFound = (): JSX.Element => {
  return (
    <section className={classNames('error-message-wrapper')}>
      <h1 className={classNames('error-message-text')}>
        Hey, Error 404 here, your page not found. Try again with correct path!
      </h1>
      <Link className={classNames('error-message-link')} to={'/'}>
        Back
      </Link>
    </section>
  );
};
