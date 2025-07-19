import React from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddAccommodationButton } from '@modules/Accommodations/feature/AddAccommodationButton';

import './style.css';

import {
  useCreateAccommodationMutation,
  useLazyGetAllAccommodationsQuery,
} from '@global/api/accommodations/accommodation.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddAccommodation } from '@shared/interfaces/Accommodation.interfaces';
import { createAccommodationValidator } from '@shared/validators/create-accommodation.validator';

interface AddAccommodationFormProps {
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const AddAccommodationForm = ({ setIsOpenedModal }: AddAccommodationFormProps): React.ReactNode => {
  const { handleSubmit, register } = useForm<AddAccommodation>({
    resolver: yupResolver(createAccommodationValidator),
  });
  const [createAccommodation] = useCreateAccommodationMutation();
  const [fetchAllAccommodations] = useLazyGetAllAccommodationsQuery();

  const onSubmit = async (data: AddAccommodation): Promise<void> => {
    try {
      await createAccommodation({ ...data, price: Number(data.price) }).unwrap();
      setIsOpenedModal(false);
      await fetchAllAccommodations(undefined);
      toast.success('Accommodation successfully added');
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
        <AddAccommodationButton />
      </div>
    </form>
  );
};
