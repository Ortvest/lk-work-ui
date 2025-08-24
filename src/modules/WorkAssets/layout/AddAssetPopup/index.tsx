import { Fragment } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';

import { AddWorkAssetForm } from '@modules/WorkAssets/features/AddStuffForm';

import './style.css';

interface AddAssetPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const AddAssetPopup = ({ isOpen, setIsOpenedModal }: AddAssetPopupProps): JSX.Element => {
  const { t } = useTranslation('work-assets-table');

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
          <h1 className={classNames('add-employee-popup-title')}>{t('modalAddWorkAssetsBtn')}</h1>
        </header>
        <main>
          <AddWorkAssetForm isEditMode={false} setIsOpenedModal={setIsOpenedModal} />
        </main>
      </ReactModal>
    </Fragment>
  );
};
