import classNames from 'classnames';

import { Menu } from '@modules/Header/features/Menu';
import { Logo } from '@modules/Header/layout/Logo';
import { Wrapper } from '@modules/Header/layout/Wrapper';

export const Header = (): JSX.Element => {
  return (
    <header className={classNames('header')}>
      <Wrapper>
        <Logo />
        <Menu />
      </Wrapper>
    </header>
  );
};
