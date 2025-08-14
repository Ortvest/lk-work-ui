import { Fragment, useEffect, useState } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';

export const PhotoField = (): JSX.Element => {
  const { register, setValue } = useFormContext();
  const [preview, setPreview] = useState('');
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const fileKey = useTypedSelector((state) => state.userReducer.user?.personalInfo.avatarUrl);
  const selectedEmployeefileKey = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo.avatarUrl
  );

  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? fileKey : selectedEmployeefileKey;
  const currentPersonalDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();
  const [userPhoto, setUserPhoto] = useState('');

  const onFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (): void => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setValue('avatarUrl', file);
    }
  };

  const handleUploadButtonClick = (): void => {
    const input = document.getElementById('file-input') as HTMLInputElement;
    input?.click();
  };

  useEffect(() => {
    const getUserAvatar = async (): Promise<void> => {
      if (!currentDataOrigin) return;

      const { data, error } = await getUploadedPhoto(currentDataOrigin as string);

      if (error || !data) {
        console.error('Failed to get passport photo url:', error);
        return;
      }

      setUserPhoto(data.url);
    };

    getUserAvatar();
  }, [currentDataOrigin]);

  useEffect(() => {
    if (isEditModeEnabled && !preview && userPhoto) {
      setPreview(userPhoto);
    }
  }, [isEditModeEnabled, userPhoto, preview]);

  const getUserInitials = (firstName: string, lastName: string): string => {
    if (!firstName || !lastName) return '';

    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  };

  return (
    <Fragment>
      {isEditModeEnabled ? (
        <SharedLabel title="Photo:*">
          <div className={classNames('photo-field-wrapper')}>
            <div className={classNames('photo-field-preview')}>
              {preview ? (
                <img className={classNames('photo-field-img')} src={preview} alt="user-photo" />
              ) : (
                <span className={classNames('photo-field-initials')}>
                  {getUserInitials(
                    currentPersonalDataOrigin?.firstName as string,
                    currentPersonalDataOrigin?.lastName as string
                  )}
                </span>
              )}
            </div>
            <input
              id="file-input"
              className={classNames('photo-field-input')}
              type="file"
              {...register('avatarUrl')}
              onChange={onFileChangeHandler}
              accept="image/*"
            />
            <button type="button" className={classNames('photo-field-button')} onClick={handleUploadButtonClick}>
              Upload Photo
            </button>
          </div>
        </SharedLabel>
      ) : (
        <SharedLabel title="User photo:">
          <span>
            {userPhoto ? (
              <img className={classNames('photo-field-img')} src={userPhoto || AlertIcon} alt="user-photo" />
            ) : (
              <span className={classNames('photo-field-initials')}>
                {getUserInitials(
                  currentPersonalDataOrigin?.firstName as string,
                  currentPersonalDataOrigin?.lastName as string
                )}
              </span>
            )}
          </span>
        </SharedLabel>
      )}
    </Fragment>
  );
};
