import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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
  const selectedAccommodation = useTypedSelector((state) => state.accommodationReducer.selectedAccommodation);

  useEffect(() => {
    console.log(isEditMode, 'isEditMode');
  }, [isEditMode]);
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
      } else {
        await editAccommodation({ ...data, price: Number(data.price), accommodationId: data?._id || '' }).unwrap();
      }
      setIsOpenedModal(false);
      await fetchAllAccommodations(undefined);

      if (!isEditMode) {
        toast.success('Accommodation successfully added');
      } else {
        toast.success('Accommodation successfully edited');
      }
    } catch (error) {
      toast.error('Failed to add accommodation');
      console.error(error);
    }
  };

  const onCancelHandler = (): void => {
    setIsOpenedModal(false);
  };
  return (
    <form className="add-employee-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-email">
          Accommodation name*
        </label>
        <input
          placeholder={'Enter name of accommodation'}
          className="form-field-field"
          {...register('name')}
          id={'employee-email'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-first-name">
          Accommodation address*
        </label>
        <input
          placeholder={'Enter address of accommodation'}
          className="form-field-field"
          {...register('address')}
          id={'employee-first-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Accommodation price*
        </label>
        <input
          placeholder={'Enter price of accommodation'}
          className="form-field-field"
          {...register('price')}
          id={'employee-second-name'}
          type="text"
        />
      </div>

      <div className="form-buttons-wrapper">
        <button onClick={onCancelHandler} className="cancel-button">
          Cancel
        </button>
        <AddAccommodationButton title={isEditMode ? 'Edit Accommodation' : 'Add Accommodation'} />
      </div>
    </form>
  );
};
