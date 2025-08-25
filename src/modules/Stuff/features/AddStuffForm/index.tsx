import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('employees-table');
  const selectedEmployee = useTypedSelector((state) => state.employeeReducer.selectedEmployee);

  const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);
  const { handleSubmit, register } = useForm<Partial<UserEntity>>({
    defaultValues: isEditMode ? (selectedEmployee as UserEntity) : ({} as unknown as UserEntity),
  });

  useGetAllWorkCompaniesQuery(undefined);
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
        fullName: '',
      });

      toast.success(isEditMode ? t('toastStuffEdited') : t('toastStuffAdded'));
    } catch (error) {
      toast.error(t('toastStuffAddFailed'));
      console.error(error);
    }
  };

  const onCancelHandler = (): void => {
    setIsOpenedModal(false);
  };

  useEffect(() => {
    if (workCompanies) {
      setDepartments(workCompanies.map((company) => ({ label: company.name, value: company.name })));
    }
  }, [workCompanies]);

  return (
    <form className={classNames('add-stuff-worker-form')} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label className="form-field-label" htmlFor="stuff-first-name">
          {t('modalStuffFirstNameLabel')}
        </label>
        <input
          placeholder={t('modalStuffFirstNamePlaceholder')}
          className="form-field-field"
          {...register('personalInfo.firstName')}
          id="stuff-first-name"
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="stuff-last-name">
          {t('modalStuffLastNameLabel')}
        </label>
        <input
          placeholder={t('modalStuffLastNamePlaceholder')}
          className="form-field-field"
          {...register('personalInfo.lastName')}
          id="stuff-last-name"
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="stuff-email">
          {t('modalStuffEmailLabel')}
        </label>
        <input
          placeholder={t('modalStuffEmailPlaceholder')}
          className="form-field-field"
          {...register('personalInfo.email')}
          id="stuff-email"
          type="text"
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="stuff-role">
          {t('modalStuffRoleLabel')}
        </label>
        <SharedSelect
          register={register('role')}
          style={{ maxWidth: '382px' }}
          options={[
            { value: UserRoles.ACCOUNTANT, label: t('roleAccountant') },
            { value: UserRoles.OFFICE_WORKER, label: t('roleOfficeWorker') },
          ]}
        />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="stuff-department">
          {t('modalStuffDepartmentLabel')}
        </label>
        <SharedSelect register={register('jobInfo.company')} options={departments} style={{ maxWidth: '382px' }} />
      </div>
      <div className="form-buttons-wrapper">
        <button onClick={onCancelHandler} className="cancel-button">
          {t('modalCancelBtn')}
        </button>
        <AddAccommodationButton title={isEditMode ? t('modalEditStuffBtn') : t('modalAddStuffBtn')} />
      </div>
    </form>
  );
};
