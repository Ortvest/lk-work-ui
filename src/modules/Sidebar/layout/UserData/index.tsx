import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { UserSlice } from '@global/store/slices/User.slice';

import { AppRoutes } from '@global/router/routes.constans';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import DotsIcon from '@shared/assets/icons/DotsIcon.svg';
import UserIcon from '@shared/assets/icons/UserIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';

export const UserData = (): JSX.Element => {
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);
  const [userPhoto, setUserPhoto] = useState('');
  const [isExitButtonVisible, setIsExitButtonVisible] = useState(false);
  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { setIsAuth, setCurrentUser } = UserSlice.actions;

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

  const onLogoutHanlder = (): void => {
    dispatch(setIsAuth(false));
    dispatch(setCurrentUser(null));
    navigate(AppRoutes.SIGN_IN.path);
  };

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
      <button className={classNames('user-options')} onClick={() => setIsExitButtonVisible(!isExitButtonVisible)}>
        <img src={DotsIcon} alt="options-icon" />
        {isExitButtonVisible ? (
          <div className={classNames('user-exit-button-wrapper')}>
            <button className={classNames('user-exit-buttun')} onClick={onLogoutHanlder}>
              Log out
            </button>
          </div>
        ) : null}
      </button>
    </article>
  );
};
