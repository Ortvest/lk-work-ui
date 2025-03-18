import { useState } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import UserIcon from '@shared/assets/icons/UserIcon.svg';

import './style.css';

export const PhotoField = (): JSX.Element => {
  const { register, setValue } = useFormContext();
  const [preview, setPreview] = useState('');

  const onFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (): void => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setValue('photo', file);
    }
  };

  const handleUploadButtonClick = (): void => {
    const input = document.getElementById('file-input') as HTMLInputElement;
    input?.click();
  };

  return (
    <label className={classNames('field-label')}>
      Photo:*
      <div className={classNames('photo-field-wrapper')}>
        <div className={classNames('photo-field-preview')}>
          {preview ? (
            <img className={classNames('photo-field-img')} src={preview} alt="user icon" />
          ) : (
            <img className={classNames('photo-field-icon')} src={UserIcon} alt="user icon" />
          )}
        </div>
        <input
          id="file-input"
          className={classNames('photo-field-input')}
          type="file"
          {...register('photo')}
          onChange={onFileChangeHandler}
          accept="image/*"
        />
        <button type="button" className={classNames('photo-field-button')} onClick={handleUploadButtonClick}>
          Upload Photo
        </button>
      </div>
    </label>
  );
};
