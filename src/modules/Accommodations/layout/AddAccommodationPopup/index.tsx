import classNames from 'classnames';
import ReactModal from 'react-modal';

import { AddAccommodationForm } from '@modules/Accommodations/feature/AddAccommodationForm';


import './style.css';

interface AddAccommodationPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const AddAccommodationPopup = ({ isOpen, setIsOpenedModal }: AddAccommodationPopupProps): JSX.Element => {
  return (
    <ReactModal
      ariaHideApp={false}
      overlayClassName="add-employee-popup-overlay"
      className={classNames('add-employee-popup-container')}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      isOpen={isOpen}>
      <header>
        <h1 className={classNames('add-employee-popup-title')}>Create accommodation</h1>
      </header>
      <main>
        <AddAccommodationForm setIsOpenedModal={setIsOpenedModal} />
      </main>
    </ReactModal>
  );
};
