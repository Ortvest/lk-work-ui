import { Fragment } from 'react';

import { Header } from '@modules/Header';

import { GlobalContainer } from '@shared/components/GlobalContainer';

export const LandingPage = (): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <GlobalContainer>Hello</GlobalContainer>
    </Fragment>
  );
};
