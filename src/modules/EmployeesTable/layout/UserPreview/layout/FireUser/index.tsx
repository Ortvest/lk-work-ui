import React, { Fragment } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';

import IconArrowLeft from '@shared/assets/icons/IconArrowLeft.svg';

import './style.css';

import { useLayOffEmployeeMutation, useLazyFetchAllEmployeesQuery } from '@global/api/employee/employee.api';
import { UserWorkStatuses } from '@shared/enums/user.enums';
import { UserEntity } from '@shared/interfaces/User.interfaces';

interface UserPreviewHeaderProps {
  selectedEmployee: UserEntity | null;
  setIsFireUserDrawerOpen: (isOpen: boolean) => void;
}

export const FireUser = ({ selectedEmployee, setIsFireUserDrawerOpen }: UserPreviewHeaderProps): React.ReactNode => {
  const { t } = useTranslation('employees-table');

  const onClosePreview = (): void => setIsFireUserDrawerOpen(false);

  const [layOffEmployee] = useLayOffEmployeeMutation();
  const [fetchEmployees] = useLazyFetchAllEmployeesQuery();

  const user = useTypedSelector((state) => state.userReducer.user);

  const methods = useForm<{ dismissalDate: { year: string; month: string; day: string } }>({
    defaultValues: {
      dismissalDate: { year: '', month: '', day: '' },
    },
  });

  const dateParser = (date: string): string => {
    if (!date) return '';
    const parsedDate = JSON.parse(date);
    const year = String(parsedDate.year || '');
    const month = String(parsedDate.month || '').padStart(2, '0');
    const day = String(parsedDate.day || '').padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const onFireUserHandler = async (data: {
    dismissalDate: { year: string; month: string; day: string };
  }): Promise<void> => {
    if (!selectedEmployee?._id) return;
    const layOffDate = dateParser(JSON.stringify(data.dismissalDate));
    const employeeId = selectedEmployee?._id;

    if (!data.dismissalDate.year || !data.dismissalDate.month || !data.dismissalDate.day) {
      toast.error(t('toastFireUserDateRequired'));
      return;
    }

    await layOffEmployee({ employeeId, layOffDate }).then((response) =>
      response.data ? toast.success(t('toastFireUserSuccess')) : toast.error(t('toastFireUserError'))
    );

    await fetchEmployees({ location: user?.address.city, workStatus: UserWorkStatuses.WORKING, company: '' });

    onClosePreview();
  };

  return (
    <Fragment>
      <header className={classNames('fire-user-preview-header')}>
        <button
          onClick={onClosePreview}
          className={classNames('user-preview-header-button')}
          aria-label={t('userPreviewBack')}>
          <img src={IconArrowLeft} alt="" />
        </button>
        <div className="fire-user-preview-header-center">
          <p>
            {t('fireUserTitle', {
              name: `${selectedEmployee?.personalInfo.firstName} ${selectedEmployee?.personalInfo.lastName}`,
            })}
          </p>
        </div>
      </header>
      <section className="fire-user-preview-data">
        <header className="fire-user-preview-contact-header">
          <h1 className="fire-user-preview-heading">{t('fireUserAreYouSure')}</h1>
          <p className="fire-user-preview-text">{t('fireUserPickQuitDate')}</p>
        </header>
        <main className="user-preview-contact-main">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onFireUserHandler)}>
              <SharedDateSelector dateSelectorTitle="" namePrefix="dismissalDate" />
              <span className="fire-user-preview-border"></span>
              <footer className="fire-user-preview-footer">
                <button type="button" className="fire-user-preview-cancel" onClick={onClosePreview}>
                  {t('modalCancelBtn')}
                </button>
                <button type="submit" className="fire-user-preview-fire">
                  {t('fireUserBtn')}
                </button>
              </footer>
            </form>
          </FormProvider>
        </main>
      </section>
    </Fragment>
  );
};
