import { Logo } from '@modules/Header/features/Logo';
import { Navigation } from '@modules/Header/features/Navigation';
import { HeaderWrapper } from '@modules/Header/layout/HeaderWrapper';

export const Header = (): JSX.Element => {
  return (
    <HeaderWrapper>
      <Logo />
      <Navigation />
    </HeaderWrapper>
  );
};
