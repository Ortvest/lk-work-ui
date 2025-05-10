import React from "react";
import { useForm } from "react-hook-form";

import './style.css'
import { AddEmployee } from '@shared/interfaces/User.interfaces';
import { AddEmployeeButton } from "@modules/EmployeesTable/features/AddEmployeeButton";
import { useInviteEmployeeMutation } from "@global/api/employee/employee.api";
import { UserRoles } from "@shared/enums/user.enums";

interface AddEmployeeFormProps {
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const AddEmployeeForm = ({setIsOpenedModal}: AddEmployeeFormProps): React.ReactNode => {
  const { handleSubmit, register } = useForm<AddEmployee>({});
  const [inviteEmployee] = useInviteEmployeeMutation();

  const onSubmit = (data: AddEmployee): void => {
    inviteEmployee({...data, role: UserRoles.EMPLOYEE}).then(() => {
      setIsOpenedModal(false)
    })

  }

  const onCancelHandler = (): void => {
    setIsOpenedModal(false)
  }
  return (
    <form className="add-employee-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-email">Email*</label>
        <input placeholder={'Enter email'} className="form-field-field" {...register('email')} id={'employee-email'} type="email" />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-first-name">First name*</label>
        <input  placeholder={'Enter First Name'} className="form-field-field" {...register('firstName')} id={'employee-first-name'} type="text" />
      </div>
      <div className="form-field">
        <label className="form-field-label" htmlFor="employee-second-name">Second name*</label>
        <input placeholder={'Enter Second Name'} className="form-field-field" {...register('lastName')}  id={'employee-second-name'} type="text" />
      </div>


      <div className="form-buttons-wrapper">
        <button onClick={onCancelHandler} className='cancel-button'>Cancel</button>
        <AddEmployeeButton/>
      </div>
    </form>
  );
}