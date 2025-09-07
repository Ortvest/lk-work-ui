import { Fragment } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';

import { AddCompanyForm } from '@modules/Companies/feature/AddCompanyForm';

import './style.css';

interface AddCompanyPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const AddCompanyPopup = ({ isOpen, setIsOpenedModal }: AddCompanyPopupProps): JSX.Element => {
  const { t } = useTranslation('companies');

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
          <h1 className={classNames('add-employee-popup-title')}>{t('btnAddCompany')}</h1>
        </header>
        <main>
          <AddCompanyForm isEditMode={false} setIsOpenedModal={setIsOpenedModal} />
        </main>
      </ReactModal>
    </Fragment>
  );
};
