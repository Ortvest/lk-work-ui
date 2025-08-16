import { Fragment } from 'react';

import classNames from 'classnames';
import ReactModal from 'react-modal';

import { AddAccommodationForm } from '@modules/Accommodations/feature/AddAccommodationForm';

import './style.css';
import { useTranslation } from "react-i18next";

interface AddAccommodationPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const AddAccommodationPopup = ({ isOpen, setIsOpenedModal }: AddAccommodationPopupProps): JSX.Element => {
  const { t } = useTranslation('accommodations');
  return (
    <Fragment>
      <ReactModal
        ariaHideApp={false}
        overlayClassName="add-employee-popup-overlay"
        className={classNames('add-employee-popup-container')}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        isOpen={isOpen}>
        <header>
          <h1 className={classNames('add-employee-popup-title')}>{t("btnAddAccommodation")}</h1>
        </header>
        <main>
          <AddAccommodationForm isEditMode={false} setIsOpenedModal={setIsOpenedModal} />
        </main>
      </ReactModal>
    </Fragment>
  );
};
