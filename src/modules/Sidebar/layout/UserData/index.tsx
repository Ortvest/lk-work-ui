import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import DotsIcon from '@shared/assets/icons/DotsIcon.svg';
import UserIcon from '@shared/assets/icons/UserIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';

export const UserData = (): JSX.Element => {
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);
  const [userPhoto, setUserPhoto] = useState('');
  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getUserAvatar = async (): Promise<void> => {
      if (!personalInfo?.avatarUrl) return;

      const { data, error } = await getUploadedPhoto(personalInfo?.avatarUrl as string);

      if (error || !data) {
        console.error('Failed to get passport photo url:', error);
        return;
      }

      setUserPhoto(data.url);
    };

    getUserAvatar();
  }, [personalInfo?.avatarUrl]);

  return (
    <article className={classNames('user-data')}>
      <div className={classNames('user-avatar')}>
        {userPhoto ? (
          <img className={classNames('user-avatar-photo')} src={userPhoto} alt="user-icon" />
        ) : (
          <img className={classNames('user-avatar-icon')} src={UserIcon} alt="user-icon" />
        )}
      </div>
      <div className={classNames('user-data-values')}>
        <div className={classNames('user-name')}>
          {personalInfo?.firstName || ''} {personalInfo?.lastName || ''}
        </div>
        <div className={classNames('user-email')}>{personalInfo?.email || '-'}</div>
      </div>
      <button className={classNames('user-options')}>
        <img src={DotsIcon} alt="options-icon" />
      </button>
    </article>
  );
};
