import classNames from 'classnames';

import { Menu } from '@modules/Header/features/Menu';
import { HeaderWrapper } from '@modules/Header/layout/HeaderWrapper';
import { Logo } from '@modules/Header/layout/Logo';

export const Header = (): JSX.Element => {
  return (
    <header className={classNames('header')}>
      <HeaderWrapper>
        <Logo />
        <Menu />
      </HeaderWrapper>
    </header>
  );
};
