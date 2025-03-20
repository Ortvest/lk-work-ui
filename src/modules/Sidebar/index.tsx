import classNames from 'classnames';

import { Navigation } from '@modules/Sidebar/layout/Navigation';
import { ProgressBar } from '@modules/Sidebar/layout/ProgressBar';
import { SidebarWrapper } from '@modules/Sidebar/layout/SidebarWrapper';
import { UserData } from '@modules/Sidebar/layout/UserData';

import './style.css';

export const Sidebar = (): JSX.Element => {
  return (
    <section className={classNames('sidebar')}>
      <SidebarWrapper>
        <header className={classNames('sidebar-header')}>
          <UserData />
          <ProgressBar totalProgress={9} currentProgress={1} />
        </header>
        <nav className={classNames('sidebar-navigation')}>
          <Navigation />
        </nav>
      </SidebarWrapper>
    </section>
  );
};
