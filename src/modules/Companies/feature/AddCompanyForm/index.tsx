import React from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { AddAccommodationButton } from '@modules/Accommodations/feature/AddAccommodationButton';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './style.css';

import {
  useCreateWorkCompanyMutation,
  useEditWorkCompanyMutation,
  useLazyGetAllWorkCompaniesQuery,
} from '@global/api/work-company/work-company.api';
import { AddWorkCompany, EditWorkCompany } from '@shared/interfaces/WorkCompanies.interfaces';

interface AddCompanyFormProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  isEditMode: boolean;
}

export const AddCompanyForm = ({ setIsOpenedModal, isEditMode }: AddCompanyFormProps): React.ReactNode => {
  const { t } = useTranslation('companies');
  const selectedCompany = useTypedSelector((state) => state.workCompanyReducer.selectedWorkCompany);

  const { handleSubmit, register } = useForm<AddWorkCompany | EditWorkCompany>({
    defaultValues: isEditMode ? (selectedCompany as EditWorkCompany) : ({} as unknown as AddWorkCompany),
  });

  const [createWorkCompany] = useCreateWorkCompanyMutation();
  const [editWorkCompany] = useEditWorkCompanyMutation();
  const [fetchAllWorkCompanies] = useLazyGetAllWorkCompaniesQuery();

  const onSubmit = async (data: AddWorkCompany | EditWorkCompany): Promise<void> => {
    try {
      if (!isEditMode) {
        await createWorkCompany({ ...data, nip: Number(data.nip) } as AddWorkCompany).unwrap();
        toast.success(t('toastCompanyAdded'));
      } else {
        await editWorkCompany(data).unwrap();
        toast.success(t('toastCompanyEdited'));
      }
      setIsOpenedModal(false);
      await fetchAllWorkCompanies(undefined);
    } catch (error) {
      toast.error(t('toastCompanyAddFailed'));
      console.error(error);
    }
  };

  const onCancelHandler = (): void => {
    setIsOpenedModal(false);
  };

  return (
    <form className={classNames('add-company-form', 'scrolled')} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label className="form-field-label">{t('modalCompanyNameLabel')}</label>
        <input placeholder={t('modalCompanyNamePlaceholder')} className="form-field-field" {...register('name')} />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalCompanyNipLabel')}</label>
        <input placeholder={t('modalCompanyNipPlaceholder')} className="form-field-field" {...register('nip')} />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalCompanyAddressLabel')}</label>
        <input
          placeholder={t('modalCompanyAddressPlaceholder')}
          className="form-field-field"
          {...register('address')}
        />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalCompanyPhoneLabel')}</label>
        <input
          placeholder={t('modalCompanyPhonePlaceholder')}
          className="form-field-field"
          {...register('phoneNumber')}
        />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalCompanyEmailLabel')}</label>
        <input placeholder={t('modalCompanyEmailPlaceholder')} className="form-field-field" {...register('email')} />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalCompanyCityLabel')}</label>
        <input placeholder={t('modalCompanyCityPlaceholder')} className="form-field-field" {...register('city')} />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalContactFirstNameLabel')}</label>
        <input
          placeholder={t('modalContactFirstNamePlaceholder')}
          className="form-field-field"
          {...register('contactPerson.personFirstName')}
        />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalContactLastNameLabel')}</label>
        <input
          placeholder={t('modalContactLastNamePlaceholder')}
          className="form-field-field"
          {...register('contactPerson.personSecondName')}
        />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalContactPositionLabel')}</label>
        <input
          placeholder={t('modalContactPositionPlaceholder')}
          className="form-field-field"
          {...register('contactPerson.personPosition')}
        />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalContactPhoneLabel')}</label>
        <input
          placeholder={t('modalContactPhonePlaceholder')}
          className="form-field-field"
          {...register('contactPerson.personPhoneNumber')}
        />
      </div>

      <div className="form-field">
        <label className="form-field-label">{t('modalContactEmailLabel')}</label>
        <input
          placeholder={t('modalContactEmailPlaceholder')}
          className="form-field-field"
          {...register('contactPerson.personEmail')}
        />
      </div>

      <div className="form-buttons-wrapper">
        <button onClick={onCancelHandler} className="cancel-button">
          {t('btnCancel')}
        </button>
        <AddAccommodationButton title={isEditMode ? t('btnEditCompany') : t('btnAddCompany')} />
      </div>
    </form>
  );
};
