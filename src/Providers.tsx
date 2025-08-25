import React, { Fragment } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@global/store';

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps): JSX.Element => {
  return (
    <Fragment>
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    </Fragment>
  );
};
