import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AddAccommodationButton } from '@modules/Accommodations/feature/AddAccommodationButton';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import {
  useEditUserDataMutation,
  useInviteEmployeeMutation,
  useLazyFetchAllEmployeesQuery,
} from '@global/api/employee/employee.api';
import { useGetAllWorkCompaniesQuery } from '@global/api/work-company/work-company.api';
import { UserRoles, UserWorkStatuses } from '@shared/enums/user.enums';
import { UserEntity } from '@shared/interfaces/User.interfaces';

interface AddStuffFormProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  isEditMode: boolean;
}

export const AddStuffForm = ({ setIsOpenedModal, isEditMode }: AddStuffFormProps): React.ReactNode => {
  const selectedEmployee = useTypedSelector((state) => state.employeeReducer.selectedEmployee);

  const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);
  const { handleSubmit, register } = useForm<Partial<UserEntity>>({
    defaultValues: isEditMode ? (selectedEmployee as UserEntity) : ({} as unknown as UserEntity),
  });

  // eslint-disable-next-line no-empty-pattern
  const {} = useGetAllWorkCompaniesQuery(undefined);
  const [inviteStuffWorker] = useInviteEmployeeMutation();
  const [editUserData] = useEditUserDataMutation();
  const [fetchAllStuffWorkers] = useLazyFetchAllEmployeesQuery(undefined);

  const workCompanies = useTypedSelector((state) => state.workCompanyReducer.workCompanies);

  const onSubmit = async (data: Partial<UserEntity>): Promise<void> => {
    try {
      if (!isEditMode) {
        await inviteStuffWorker({
          firstName: data?.personalInfo?.firstName,
          lastName: data?.personalInfo?.lastName,
          email: data?.personalInfo?.email,
          role: data?.role,
          company: data?.jobInfo?.company,
        });
      } else {
        delete data?._id;
        await editUserData({ ...data, employeeId: selectedEmployee?._id }).unwrap();
      }
      setIsOpenedModal(false);
      await fetchAllStuffWorkers({
        workStatus: UserWorkStatuses.WORKING,
        roles: [UserRoles.OFFICE_WORKER, UserRoles.ACCOUNTANT],
        location: '',
        company: '',
      });

      if (!isEditMode) {
        toast.success('Worker successfully added');
      } else {
        toast.success('Worker successfully edited');
      }
    } catch (error) {
      toast.error('Failed to add Worker');
      console.error(error);
    }
  };

  const onCancelHandler = (): void => {
    setIsOpenedModal(false);
  };

  useEffect(() => {
    if (workCompanies) {
      workCompanies.map((company) =>
        setDepartments((prevState) => [...prevState, { label: company.name, value: company.name }])
      );
    }
  }, []);
  return (
    <form className={classNames('add-stuff-worker-form')} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-email">
          First Name
        </label>
        <input
          placeholder={'Enter First Name'}
          className="form-field-field"
          {...register('personalInfo.firstName')}
          id={'employee-email'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-first-name">
          Last Name
        </label>
        <input
          placeholder={'Enter Last Name'}
          className="form-field-field"
          {...register('personalInfo.lastName')}
          id={'employee-first-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-first-name">
          Email
        </label>
        <input
          placeholder={'Enter Email'}
          className="form-field-field"
          {...register('personalInfo.email')}
          id={'employee-first-name'}
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-first-name">
          Role
        </label>
        <SharedSelect
          register={register('role')}
          options={[
            { value: UserRoles.ACCOUNTANT, label: 'Accountant' },
            { value: UserRoles.OFFICE_WORKER, label: 'Office Worker' },
          ]}
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">
          Department
        </label>
        <SharedSelect register={register('jobInfo.company')} options={departments} />
      </div>
      <div className="form-buttons-wrapper">
        <button onClick={onCancelHandler} className="cancel-button">
          Cancel
        </button>
        <AddAccommodationButton title={isEditMode ? 'Edit Stuff Worker Data' : 'Add Stuff Worker'} />
      </div>
    </form>
  );
};
