import { Fragment } from 'react';

import { Header } from '@modules/Header';
import { Sidebar } from '@modules/Sidebar';

import { GlobalContainer } from '@shared/components/GlobalContainer';

export const LandingPage = (): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <GlobalContainer>
        <Sidebar />
      </GlobalContainer>
    </Fragment>
  );
};
