import { Fragment, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { BookDayOffModal } from '@modules/Sidebar/features/BookDayOffModal';
import { Navigation } from '@modules/Sidebar/layout/Navigation';
import { SidebarWrapper } from '@modules/Sidebar/layout/SidebarWrapper';
import { UserData } from '@modules/Sidebar/layout/UserData';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import CalendarIcon from '@shared/assets/icons/CalendarIcon.svg';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const Sidebar = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSidebarVisible = useTypedSelector((state) => state.CommonReducer.isSidebarVisible);

  const onModalOpenHandler = (): void => {
    setIsModalOpen(true);
  };

  return (
    <section className={classNames('sidebar', { mobileSidebar: isSidebarVisible })}>
      <SidebarWrapper>
        <header className={classNames('sidebar-header')}>
          <UserData />
        </header>
        <nav className={classNames('sidebar-navigation')}>
          <Navigation />
        </nav>
        {userRole === UserRoles.EMPLOYEE ? (
          <Fragment>
            <button className={classNames('sidebar-book-day-off-btn')} onClick={onModalOpenHandler}>
              <img src={CalendarIcon} alt="book-day-off-icon" />
              {t('bookDayOffTitle')}
            </button>
            <BookDayOffModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </Fragment>
        ) : null}
      </SidebarWrapper>
    </section>
  );
};
