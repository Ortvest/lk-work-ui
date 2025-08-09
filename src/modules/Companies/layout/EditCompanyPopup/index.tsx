import { Fragment } from 'react';

import classNames from 'classnames';
import toast from 'react-hot-toast';
import ReactModal from 'react-modal';

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
  const [removeWorkCompany] = useLazyRemoveWorkCompanyQuery();
  const selectedWorkCompany = useTypedSelector((state) => state.workCompanyReducer.selectedWorkCompany);
  const [fetchAllWorkCompanies] = useLazyGetAllWorkCompaniesQuery();

  const onDeleteAccommodation = async (): Promise<void> => {
    await removeWorkCompany({ workCompanyId: selectedWorkCompany?._id || '' });
    await fetchAllWorkCompanies(undefined);
    setIsOpenedModal(false);
    toast.success('Accommodation was deleted successfully.');
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
          <h1 className={classNames('add-employee-popup-title')}>Edit company</h1>
        </header>
        <main>
          <AddCompanyForm isEditMode={true} setIsOpenedModal={setIsOpenedModal} />
        </main>
        <div className={classNames('edit-accommodation-delete-btn-wrapper')}>
          <SharedButton onClick={onDeleteAccommodation} type={'button'} text={'Delete company'} />
        </div>
      </ReactModal>
    </Fragment>
  );
};
