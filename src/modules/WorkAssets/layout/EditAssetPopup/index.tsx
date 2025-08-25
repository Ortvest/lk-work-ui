import { Fragment } from 'react';

import classNames from 'classnames';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';

import { AddWorkAssetForm } from '@modules/WorkAssets/features/AddStuffForm';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedButton } from '@shared/components/SharedButton';

import './style.css';

import { useLazyListWorkAssetsQuery, useRemoveWorkAssetMutation } from '@global/api/workAssets/workAssets';

interface EditStuffPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const EditAssetPopup = ({ isOpen, setIsOpenedModal }: EditStuffPopupProps): JSX.Element => {
  const { t } = useTranslation('work-assets-table');
  const [removeAsset] = useRemoveWorkAssetMutation();
  const selectedAsset = useTypedSelector((state) => state.workAssetReducer.selectedAsset);
  const [fetchAllAssets] = useLazyListWorkAssetsQuery();

  const onDeleteAsset = async (): Promise<void> => {
    try {
      await removeAsset(selectedAsset?._id || '');
      await fetchAllAssets();
      setIsOpenedModal(false);

      toast.success(t('toastAssetDeleted'));
    } catch (error) {
      console.error(error);
      toast.error(t('toastAssetDeleteFailed'));
    }
  };

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
          <h1 className={classNames('add-employee-popup-title')}>{t('modalEditStuffWorker')}</h1>
        </header>
        <main>
          <AddWorkAssetForm selectedAsset={selectedAsset} isEditMode={true} setIsOpenedModal={setIsOpenedModal} />
        </main>
        <div className={classNames('edit-accommodation-delete-btn-wrapper')}>
          <SharedButton onClick={onDeleteAsset} type={'button'} text={t('deleteAsset')} />
        </div>
      </ReactModal>
    </Fragment>
  );
};
