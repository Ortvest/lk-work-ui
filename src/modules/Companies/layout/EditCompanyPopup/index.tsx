import { Fragment } from 'react';
import classNames from 'classnames';
import toast from 'react-hot-toast';
import ReactModal from 'react-modal';
import { useTranslation } from 'react-i18next';

import { AddCompanyForm } from '@modules/Companies/feature/AddCompanyForm';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';
import { SharedButton } from '@shared/components/SharedButton';

import './style.css';

import {
  useLazyGetAllWorkCompaniesQuery,
  useLazyRemoveWorkCompanyQuery,
} from '@global/api/work-company/work-company.api';

interface EditCompanyPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}

export const EditCompanyPopup = ({ isOpen, setIsOpenedModal }: EditCompanyPopupProps): JSX.Element => {
  const { t } = useTranslation('companies');
  const [removeWorkCompany] = useLazyRemoveWorkCompanyQuery();
  const selectedWorkCompany = useTypedSelector((state) => state.workCompanyReducer.selectedWorkCompany);
  const [fetchAllWorkCompanies] = useLazyGetAllWorkCompaniesQuery();

  const onDeleteCompany = async (): Promise<void> => {
    try {
      await removeWorkCompany({ workCompanyId: selectedWorkCompany?._id || '' }).unwrap();
      await fetchAllWorkCompanies(undefined);
      setIsOpenedModal(false);
      toast.success(t('toastCompanyDeleted'));
    } catch (error) {
      toast.error(t('toastCompanyDeleteFailed'));
      console.error(error);
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
          <h1 className={classNames('add-employee-popup-title')}>{t('popupEditCompanyTitle')}</h1>
        </header>
        <main>
          <AddCompanyForm isEditMode={true} setIsOpenedModal={setIsOpenedModal} />
        </main>
        <div className={classNames('edit-accommodation-delete-btn-wrapper')}>
          <SharedButton onClick={onDeleteCompany} type="button" text={t('btnDeleteCompany')} />
        </div>
      </ReactModal>
    </Fragment>
  );
};
