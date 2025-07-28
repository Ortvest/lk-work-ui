import classNames from 'classnames';
import ReactModal from 'react-modal';

import { AddCompanyForm } from '@modules/Companies/feature/AddCompanyForm';

import './style.css';

interface AddCompanyPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const AddCompanyPopup = ({ isOpen, setIsOpenedModal }: AddCompanyPopupProps): JSX.Element => {
  return (
    <ReactModal
      ariaHideApp={false}
      overlayClassName="add-employee-popup-overlay"
      className={classNames('add-employee-popup-container')}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      isOpen={isOpen}>
      <header>
        <h1 className={classNames('add-employee-popup-title')}>Create company</h1>
      </header>
      <main>
        <AddCompanyForm isEditMode={false} setIsOpenedModal={setIsOpenedModal} />
      </main>
    </ReactModal>
  );
};
