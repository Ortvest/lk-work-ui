import React from 'react';

import classNames from 'classnames';

import './style.css';

export const UserPreviewToolbar = (): React.ReactNode => {
  return (
    <section className={classNames('user-preview-toolbar')}>
      <button className={classNames('user-preview-toolbar-button')}>Cancel</button>
      <button className={classNames('user-preview-toolbar-button')}>See Details</button>
    </section>
  );
};
