import { useState } from 'react';

import classNames from 'classnames';

import { BookDayOffModal } from '@modules/Sidebar/features/BookDayOffModal';
import { Navigation } from '@modules/Sidebar/layout/Navigation';
import { ProgressBar } from '@modules/Sidebar/layout/ProgressBar';
import { SidebarWrapper } from '@modules/Sidebar/layout/SidebarWrapper';
import { UserData } from '@modules/Sidebar/layout/UserData';

import CalendarIcon from '@shared/assets/icons/CalendarIcon.svg';

import './style.css';

export const Sidebar = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalOpenHandler = (): void => {
    setIsModalOpen(true);
  };

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
        <button className={classNames('sidebar-book-day-off-btn')} onClick={onModalOpenHandler}>
          <img src={CalendarIcon} alt="book-day-off-icon" />
          Book a Day Off
        </button>
        <BookDayOffModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </SidebarWrapper>
    </section>
  );
};
