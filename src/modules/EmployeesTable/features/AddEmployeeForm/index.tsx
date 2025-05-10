import React from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddEmployeeButton } from '@modules/EmployeesTable/features/AddEmployeeButton';

import './style.css';

import {
  useInviteEmployeeMutation,
  useLazyFetchAllEmployeesQuery,
} from '@global/api/employee/employee.api';
import { UserRoles } from '@shared/enums/user.enums';
import { AddEmployee } from '@shared/interfaces/User.interfaces';

interface AddEmployeeFormProps {
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const AddEmployeeForm = ({ setIsOpenedModal }: AddEmployeeFormProps): React.ReactNode => {
  const { handleSubmit, register } = useForm<AddEmployee>({});
  const [inviteEmployee] = useInviteEmployeeMutation();
  const [fetchAllEmployees] = useLazyFetchAllEmployeesQuery();
  const onSubmit = async (data: AddEmployee): Promise<void> => {
    try {
      await inviteEmployee({ ...data, role: UserRoles.EMPLOYEE }).unwrap();
      setIsOpenedModal(false);
      await fetchAllEmployees();
      toast.success('Employee successfully added');
    } catch (error) {
      toast.error('Failed to add employee');
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
          Email*
        </label>
        <input
          placeholder={'Enter email'}
          className="form-field-field"
          {...register('email')}
          id={'employee-email'}
          type="email"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-first-name">
          First name*
        </label>
        <input
          placeholder={'Enter First Name'}
          className="form-field-field"
          {...register('firstName')}
          id={'employee-first-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Second name*
        </label>
        <input
          placeholder={'Enter Second Name'}
          className="form-field-field"
          {...register('lastName')}
          id={'employee-second-name'}
          type="text"
        />
      </div>

      <div className="form-buttons-wrapper">
        <button onClick={onCancelHandler} className="cancel-button">
          Cancel
        </button>
        <AddEmployeeButton />
      </div>
    </form>
  );
};
