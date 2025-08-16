import { Fragment } from 'react';

import classNames from 'classnames';
import toast from 'react-hot-toast';
import ReactModal from 'react-modal';

import { AddAccommodationForm } from '@modules/Accommodations/feature/AddAccommodationForm';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedButton } from '@shared/components/SharedButton';

import './style.css';

import {
  useLazyGetAllAccommodationsQuery,
  useLazyRemoveAccommodationQuery,
} from '@global/api/accommodations/accommodation.api';
import { useTranslation } from "react-i18next";

interface EditAccommodationPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const EditAccommodationPopup = ({ isOpen, setIsOpenedModal }: EditAccommodationPopupProps): JSX.Element => {
  const { t } = useTranslation('accommodations');
  const [removeAccommodation] = useLazyRemoveAccommodationQuery();
  const selectedAccommodation = useTypedSelector((state) => state.accommodationReducer.selectedAccommodation);
  const [fetchAllAccommodations] = useLazyGetAllAccommodationsQuery();

  const onDeleteAccommodation = async (): Promise<void> => {
    await removeAccommodation({ accommodationId: selectedAccommodation?._id ?? '' });
    await fetchAllAccommodations(undefined);
    setIsOpenedModal(false);
    toast.success(t('toastAccommodationDeleted'));

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
          <h1 className={classNames('add-employee-popup-title')}>{t("modalEditAccommodation")}</h1>
        </header>
        <main>
          <AddAccommodationForm isEditMode={true} setIsOpenedModal={setIsOpenedModal} />
        </main>
        <div className={classNames('edit-accommodation-delete-btn-wrapper')}>
          <SharedButton onClick={onDeleteAccommodation} type={'button'} text={t("deleteAccommodation")} />
        </div>
      </ReactModal>
    </Fragment>
  );
};
