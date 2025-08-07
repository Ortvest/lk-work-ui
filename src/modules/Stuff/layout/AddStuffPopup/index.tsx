import classNames from 'classnames';
import ReactModal from 'react-modal';

import { AddStuffForm } from '@modules/Stuff/features/AddStuffForm';

import './style.css';

interface AddStuffPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const AddStuffPopup = ({ isOpen, setIsOpenedModal }: AddStuffPopupProps): JSX.Element => {
  return (
    <ReactModal
      ariaHideApp={false}
      overlayClassName="add-employee-popup-overlay"
      className={classNames('add-employee-popup-container')}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      isOpen={isOpen}>
      <header>
        <h1 className={classNames('add-employee-popup-title')}>Add stuff worker</h1>
      </header>
      <main>
        <AddStuffForm isEditMode={false} setIsOpenedModal={setIsOpenedModal} />
      </main>
    </ReactModal>
  );
};
