import { Fragment } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import { useTranslation } from 'react-i18next';

import { AddStuffForm } from '@modules/Stuff/features/AddStuffForm';

import './style.css';

interface AddStuffPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const AddStuffPopup = ({ isOpen, setIsOpenedModal }: AddStuffPopupProps): JSX.Element => {
  const { t } = useTranslation('employees-table');

  return (
    <Fragment>
      <ReactModal
        ariaHideApp={false}
        overlayClassName="add-employee-popup-overlay"
        className={classNames('add-employee-popup-container')}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        isOpen={isOpen}
      >
        <header>
          <h1 className={classNames('add-employee-popup-title')}>
            {t('modalAddStuffWorker')}
          </h1>
        </header>
        <main>
          <AddStuffForm isEditMode={false} setIsOpenedModal={setIsOpenedModal} />
        </main>
      </ReactModal>
    </Fragment>
  );
};
