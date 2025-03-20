import React, { Fragment } from 'react';

import { Provider } from 'react-redux';

import { store } from '@global/store';

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps): JSX.Element => {
  return (
    <Fragment>
      <Provider store={store}>{children}</Provider>
    </Fragment>
  );
};
