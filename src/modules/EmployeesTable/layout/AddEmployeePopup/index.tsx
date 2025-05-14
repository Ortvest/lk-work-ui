import classNames from 'classnames';
import ReactModal from 'react-modal';

import { AddEmployeeForm } from '@modules/EmployeesTable/features/AddEmployeeForm';

import './style.css';

interface AddEmployeePopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const AddEmployeePopup = ({ isOpen, setIsOpenedModal }: AddEmployeePopupProps): JSX.Element => {
  return (
    <ReactModal
      ariaHideApp={false}
      overlayClassName="add-employee-popup-overlay"
      className={classNames('add-employee-popup-container')}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      isOpen={isOpen}>
      <header>
        <h1 className={classNames('add-employee-popup-title')}>Add Employee</h1>
      </header>
      <main>
        <AddEmployeeForm setIsOpenedModal={setIsOpenedModal} />
      </main>
    </ReactModal>
  );
};
