import classNames from 'classnames';
import toast from 'react-hot-toast';
import ReactModal from 'react-modal';

import { AddStuffForm } from '@modules/Stuff/features/AddStuffForm';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedButton } from '@shared/components/SharedButton';

import './style.css';

import { useLazyFetchAllEmployeesQuery, useLazyRemoveStuffWorkerQuery } from '@global/api/employee/employee.api';
import { UserRoles, UserWorkStatuses } from '@shared/enums/user.enums';

interface EditStuffPopupProps {
  isOpen: boolean;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const EditStuffPopup = ({ isOpen, setIsOpenedModal }: EditStuffPopupProps): JSX.Element => {
  const [removeStuffWorker] = useLazyRemoveStuffWorkerQuery();
  const selectedStuffWorker = useTypedSelector((state) => state.employeeReducer.selectedEmployee);
  const [fetchAllStuffWorkersCompanies] = useLazyFetchAllEmployeesQuery();

  const onDeleteAccommodation = async (): Promise<void> => {
    await removeStuffWorker({ employeeId: selectedStuffWorker?._id || '' });
    await fetchAllStuffWorkersCompanies({
      workStatus: UserWorkStatuses.WORKING,
      roles: [UserRoles.OFFICE_WORKER, UserRoles.ACCOUNTANT],
      location: '',
      company: '',
    });
    setIsOpenedModal(false);
    toast.success(
      `${selectedStuffWorker?.role === UserRoles.ACCOUNTANT ? 'Accountant' : 'Office worker'} was deleted successfully.`
    );
  };
  return (
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
        <AddStuffForm isEditMode={true} setIsOpenedModal={setIsOpenedModal} />
      </main>
      <div className={classNames('edit-accommodation-delete-btn-wrapper')}>
        <SharedButton onClick={onDeleteAccommodation} type={'button'} text={'Delete worker'} />
      </div>
    </ReactModal>
  );
};
