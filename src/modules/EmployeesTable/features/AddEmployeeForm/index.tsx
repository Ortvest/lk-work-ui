import React from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { AddEmployeeButton } from '@modules/EmployeesTable/features/AddEmployeeButton';

import './style.css';

import { useInviteEmployeeMutation, useLazyFetchAllEmployeesQuery } from '@global/api/employee/employee.api';
import { UserRoles, UserWorkStatuses } from '@shared/enums/user.enums';
import { AddEmployee } from '@shared/interfaces/User.interfaces';

interface AddEmployeeFormProps {
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const AddEmployeeForm = ({ setIsOpenedModal }: AddEmployeeFormProps): React.ReactNode => {
  const { t } = useTranslation('employees-table');
  const { handleSubmit, register } = useForm<AddEmployee>({});
  const [inviteEmployee] = useInviteEmployeeMutation();
  const [fetchAllEmployees] = useLazyFetchAllEmployeesQuery();

  const onSubmit = async (data: AddEmployee): Promise<void> => {
    try {
      await inviteEmployee({ ...data, role: UserRoles.EMPLOYEE }).unwrap();
      setIsOpenedModal(false);
      await fetchAllEmployees({ workStatus: UserWorkStatuses.WORKING });
      toast.success(t('toastEmployeeAdded'));
    } catch (error) {
      toast.error(t('toastEmployeeAddFailed'));
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
          {t('modalEmailLabel')}
        </label>
        <input
          placeholder={t('modalEmailPlaceholder')}
          className="form-field-field"
          {...register('email')}
          id="employee-email"
          type="email"
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-first-name">
          {t('modalFirstNameLabel')}
        </label>
        <input
          placeholder={t('modalFirstNamePlaceholder')}
          className="form-field-field"
          {...register('firstName')}
          id="employee-first-name"
          type="text"
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          {t('modalSecondNameLabel')}
        </label>
        <input
          placeholder={t('modalSecondNamePlaceholder')}
          className="form-field-field"
          {...register('lastName')}
          id="employee-second-name"
          type="text"
        />
      </div>

      <div className="form-buttons-wrapper">
        <button type="button" onClick={onCancelHandler} className="cancel-button">
          {t('modalCancelBtn')}
        </button>
        <AddEmployeeButton />
      </div>
    </form>
  );
};
