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
import { UserRoles } from '@shared/enums/user.enums';

export const UserData = (): JSX.Element => {
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);
  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const [userPhoto, setUserPhoto] = useState('');
  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  const [isExitButtonVisible, setIsExitButtonVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const { setIsAuth, setCurrentUser } = UserSlice.actions;

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  useEffect(() => {
    const getUserAvatar = async (): Promise<void> => {
      if (!currentDataOrigin?.avatarUrl) return;

      const { data, error } = await getUploadedPhoto(currentDataOrigin?.avatarUrl as string);

      if (error || !data) {
        console.error('Failed to get passport photo url:', error);
        return;
      }

      setUserPhoto(data.url);
    };

    getUserAvatar();
  }, [currentDataOrigin?.avatarUrl]);

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
          {currentDataOrigin?.firstName || ''} {currentDataOrigin?.lastName || ''}
        </div>
        <div className={classNames('user-email')}>{currentDataOrigin?.email || '-'}</div>
      </div>
      {userRole === UserRoles.EMPLOYEE ? (
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
      ) : null}
    </article>
  );
};
