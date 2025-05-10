import React from 'react';

import classNames from 'classnames';

import IconDots from '@shared/assets/icons/DotsIcon.svg';
import IconArrowLeft from '@shared/assets/icons/IconArrowLeft.svg';

import './style.css';

interface UserPreviewHeaderProps {
  fullName: string;
  setIsDrawerOpen: (isOpen: boolean) => void;
}
export const UserPreviewHeader = ({ fullName, setIsDrawerOpen }: UserPreviewHeaderProps): React.ReactNode => {
  const onClosePreview = (): void => setIsDrawerOpen(false);
  return (
    <header className={classNames('user-preview-header')}>
      <div>
        <button onClick={onClosePreview} className={classNames('user-preview-header-button')}>
          <img src={IconArrowLeft} alt="IconArrowLeft" />
        </button>
      </div>
      <div>
        <p>{fullName}</p>
      </div>
      <div>
        <button className={classNames('user-preview-header-button')}>
          <img src={IconDots} alt="IconDots" />
        </button>
      </div>
    </header>
  );
};
