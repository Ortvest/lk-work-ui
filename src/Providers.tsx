import React from 'react';

import { Provider } from 'react-redux';

import { store } from '@global/store';

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps): JSX.Element => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};
