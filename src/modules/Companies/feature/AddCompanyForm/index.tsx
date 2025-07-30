import React from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddAccommodationButton } from '@modules/Accommodations/feature/AddAccommodationButton';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './style.css';

import {
  useCreateWorkCompanyMutation,
  useEditWorkCompanyMutation,
  useLazyGetAllWorkCompaniesQuery,
} from '@global/api/work-company/work-company.api';
import { AddWorkCompany, EditWorkCompany } from '@shared/interfaces/WorkCompanies.interfaces';

interface AddCompanyFormProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  isEditMode: boolean;
}

export const AddCompanyForm = ({ setIsOpenedModal, isEditMode }: AddCompanyFormProps): React.ReactNode => {
  const selectedCompany = useTypedSelector((state) => state.workCompanyReducer.selectedWorkCompany);

  const { handleSubmit, register } = useForm<AddWorkCompany | EditWorkCompany>({
    // resolver: yupResolver(createAccommodationValidator),
    defaultValues: isEditMode ? (selectedCompany as EditWorkCompany) : ({} as unknown as AddWorkCompany),
  });
  const [createWorkCompany] = useCreateWorkCompanyMutation();
  const [editWorkCompany] = useEditWorkCompanyMutation();

  const [fetchAllWorkCompanies] = useLazyGetAllWorkCompaniesQuery();

  const onSubmit = async (data: AddWorkCompany | EditWorkCompany): Promise<void> => {
    try {
      if (!isEditMode) {
        await createWorkCompany({ ...data, nip: Number(data.nip) } as unknown as AddWorkCompany).unwrap();
      } else {
        await editWorkCompany(data).unwrap();
      }
      setIsOpenedModal(false);
      await fetchAllWorkCompanies(undefined);

      if (!isEditMode) {
        toast.success('Company successfully added');
      } else {
        toast.success('Company successfully edited');
      }
    } catch (error) {
      toast.error('Failed to add company');
      console.error(error);
    }
  };

  const onCancelHandler = (): void => {
    setIsOpenedModal(false);
  };
  return (
    <form className={classNames('add-company-form', 'scrolled')} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-email">
          Name Company
        </label>
        <input
          placeholder={'Enter Name Company'}
          className="form-field-field"
          {...register('name')}
          id={'employee-email'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-first-name">
          NIP
        </label>
        <input
          placeholder={'Enter NIP'}
          className="form-field-field"
          {...register('nip')}
          id={'employee-first-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Address Company
        </label>
        <input
          placeholder={'Enter Address Company'}
          className="form-field-field"
          {...register('address')}
          id={'employee-second-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Phone Number
        </label>
        <input
          placeholder={'Enter Phone Number Company'}
          className="form-field-field"
          {...register('phoneNumber')}
          id={'employee-second-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Email
        </label>
        <input
          placeholder={'Enter Email Company'}
          className="form-field-field"
          {...register('email')}
          id={'employee-second-name'}
          type="email"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          City
        </label>
        <input
          placeholder={'Enter Company City'}
          className="form-field-field"
          {...register('city')}
          id={'employee-second-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          First Name Contact Person
        </label>
        <input
          placeholder={'Enter First Name Contact Person'}
          className="form-field-field"
          {...register('contactPerson.personFirstName')}
          id={'employee-second-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Surname Contact Person
        </label>
        <input
          placeholder={'Enter Surname Contact Person'}
          className="form-field-field"
          {...register('contactPerson.personSecondName')}
          id={'employee-second-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Position
        </label>
        <input
          placeholder={'Enter Position'}
          className="form-field-field"
          {...register('contactPerson.personPosition')}
          id={'employee-second-name'}
          type="text"
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Phone Number
        </label>
        <input
          placeholder={'Enter Phone Number Company'}
          className="form-field-field"
          {...register('contactPerson.personPhoneNumber')}
          id={'employee-second-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Email
        </label>
        <input
          placeholder={'Enter Contact Email'}
          className="form-field-field"
          {...register('contactPerson.personEmail')}
          id={'employee-second-name'}
          type="text"
        />
      </div>
      <div className="form-buttons-wrapper">
        <button onClick={onCancelHandler} className="cancel-button">
          Cancel
        </button>
        <AddAccommodationButton title={isEditMode ? 'Edit Company' : 'Add Company'} />
      </div>
    </form>
  );
};
