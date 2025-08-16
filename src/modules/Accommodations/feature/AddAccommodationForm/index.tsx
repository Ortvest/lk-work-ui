import React from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { AddAccommodationButton } from '@modules/Accommodations/feature/AddAccommodationButton';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './style.css';

import {
  useCreateAccommodationMutation,
  useEditAccommodationMutation,
  useLazyGetAllAccommodationsQuery,
} from '@global/api/accommodations/accommodation.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddAccommodation, EditAccommodation } from '@shared/interfaces/Accommodation.interfaces';
import { createAccommodationValidator } from '@shared/validators/create-accommodation.validator';

interface AddAccommodationFormProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  isEditMode: boolean;
}

export const AddAccommodationForm = ({ setIsOpenedModal, isEditMode }: AddAccommodationFormProps): React.ReactNode => {
  const { t } = useTranslation('accommodations');
  const selectedAccommodation = useTypedSelector((state) => state.accommodationReducer.selectedAccommodation);

  const { handleSubmit, register } = useForm<AddAccommodation | EditAccommodation>({
    resolver: yupResolver(createAccommodationValidator),
    defaultValues: isEditMode ? (selectedAccommodation as EditAccommodation) : ({} as unknown as AddAccommodation),
  });
  const [createAccommodation] = useCreateAccommodationMutation();
  const [editAccommodation] = useEditAccommodationMutation();

  const [fetchAllAccommodations] = useLazyGetAllAccommodationsQuery();

  const onSubmit = async (data: AddAccommodation | EditAccommodation): Promise<void> => {
    try {
      if (!isEditMode) {
        await createAccommodation({ ...data, price: Number(data.price) }).unwrap();
        toast.success(t('toastAccommodationAdded'));
      } else {
        await editAccommodation({ ...data, price: Number(data.price), accommodationId: data?._id || '' }).unwrap();
        toast.success(t('toastAccommodationEdited'));
      }
      setIsOpenedModal(false);
      await fetchAllAccommodations(undefined);
    } catch (error) {
      toast.error(t('toastAccommodationAddFailed'));
      console.error(error);
    }
  };

  const onCancelHandler = (): void => {
    setIsOpenedModal(false);
  };

  return (
    <form className="add-employee-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label className="form-field-label" htmlFor="accommodation-name">
          {t('modalAccommodationNameLabel')}
        </label>
        <input
          placeholder={t('modalAccommodationNamePlaceholder')}
          className="form-field-field"
          {...register('name')}
          id="accommodation-name"
          type="text"
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="accommodation-address">
          {t('modalAccommodationAddressLabel')}
        </label>
        <input
          placeholder={t('modalAccommodationAddressPlaceholder')}
          className="form-field-field"
          {...register('address')}
          id="accommodation-address"
          type="text"
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="accommodation-price">
          {t('modalAccommodationPriceLabel')}
        </label>
        <input
          placeholder={t('modalAccommodationPricePlaceholder')}
          className="form-field-field"
          {...register('price')}
          id="accommodation-price"
          type="text"
        />
      </div>

      <div className="form-buttons-wrapper">
        <button onClick={onCancelHandler} className="cancel-button" type="button">
          {t('modalCancelBtn')}
        </button>
        <AddAccommodationButton
          title={isEditMode ? t('btnEditAccommodation') : t('btnAddAccommodation')}
        />
      </div>
    </form>
  );
};
