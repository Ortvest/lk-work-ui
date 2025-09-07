import React, { useEffect } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { AddAccommodationButton } from '@modules/Accommodations/feature/AddAccommodationButton';

import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import {
  useCreateWorkAssetMutation,
  useLazyListWorkAssetsQuery,
  useUpdateWorkAssetMutation,
} from '@global/api/workAssets/workAssets';
import { WorkAssetStatuses } from '@shared/enums/work-assets.enum';
import { WorkAsset } from '@shared/interfaces/work-asset.interface';

interface AddWorkAssetFormProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  isEditMode: boolean;
  selectedAsset?: WorkAsset | null;
}

export const AddWorkAssetForm = ({
  setIsOpenedModal,
  isEditMode,
  selectedAsset,
}: AddWorkAssetFormProps): React.ReactNode => {
  const { t } = useTranslation('work-assets-table');
  const { handleSubmit, register, reset } = useForm<Partial<WorkAsset>>({
    defaultValues: isEditMode && selectedAsset ? selectedAsset : ({} as WorkAsset),
  });

  const [triggerCreateWorkAsset] = useCreateWorkAssetMutation();
  const [triggerUpdateWorkAsset] = useUpdateWorkAssetMutation();
  const [triggerGetAllWorkAssets] = useLazyListWorkAssetsQuery();

  useEffect(() => {
    if (isEditMode && selectedAsset) {
      reset(selectedAsset);
    }
  }, [isEditMode, selectedAsset, reset]);

  const onSubmit = async (data: Partial<WorkAsset>): Promise<void> => {
    const normalized: Partial<WorkAsset> = {
      ...data,
      startDate: data?.startDate || '',
      insuranceExpiryDate: data?.insuranceExpiryDate || '',
      lastMaintenanceDate: data?.lastMaintenanceDate || '',
      nextMaintenanceDate: data?.nextMaintenanceDate || '',
    };

    if (!isEditMode) {
      try {
        await triggerCreateWorkAsset(normalized).unwrap();
        await triggerGetAllWorkAssets();
        setIsOpenedModal(false);
        toast.success(t('toastAssetAdded'));
      } catch (error) {
        console.error(error);
        toast.error(t('toastAssetAddFailed'));
      }
    } else {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, createdAt, updatedAt, ...rest } = normalized;
        await triggerUpdateWorkAsset({ id: _id || '', body: rest }).unwrap();
        await triggerGetAllWorkAssets();
        setIsOpenedModal(false);
        toast.success(t('toastAssetEdited'));
      } catch (error) {
        console.error(error);
        toast.error(t('toastAssetAddFailed'));
      }
    }
  };

  const onCancelHandler = (): void => {
    setIsOpenedModal(false);
  };

  useEffect(() => {
    if (isEditMode && selectedAsset) {
      reset({
        ...selectedAsset,
        startDate: selectedAsset.startDate ? dayjs(selectedAsset.startDate).format('YYYY-MM-DD') : '',
        insuranceExpiryDate: selectedAsset.insuranceExpiryDate
          ? dayjs(selectedAsset.insuranceExpiryDate).format('YYYY-MM-DD')
          : '',
        lastMaintenanceDate: selectedAsset.lastMaintenanceDate
          ? dayjs(selectedAsset.lastMaintenanceDate).format('YYYY-MM-DD')
          : '',
        nextMaintenanceDate: selectedAsset.nextMaintenanceDate
          ? dayjs(selectedAsset.nextMaintenanceDate).format('YYYY-MM-DD')
          : '',
      });
    }
  }, [isEditMode, selectedAsset, reset]);
  return (
    <form className={classNames('add-work-asset-form')} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label className="form-field-label" htmlFor="asset-name">
          {t('modalAssetNameLabel')}
        </label>
        <input
          placeholder={t('modalAssetNamePlaceholder')}
          className="form-field-field"
          {...register('name')}
          id="asset-name"
          type="text"
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="asset-type">
          {t('modalAssetTypeLabel')}
        </label>
        <SharedSelect
          register={register('itemType')}
          style={{ maxWidth: '382px' }}
          options={[
            { value: 'equipment', label: t('types.equipment') },
            { value: 'tool', label: t('types.tool') },
            { value: 'furniture', label: t('types.furniture') },
            { value: 'other', label: t('types.other') },
          ]}
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="asset-status">
          {t('modalAssetStatusLabel')}
        </label>
        <SharedSelect
          register={register('status')}
          style={{ maxWidth: '382px' }}
          options={[
            { value: WorkAssetStatuses.ACTIVE, label: t('statuses.active') },
            { value: WorkAssetStatuses.NEEDS_SERVICE, label: t('statuses.needs_service') },
            { value: WorkAssetStatuses.REPLACED, label: t('statuses.replaced') },
            { value: WorkAssetStatuses.RETIRED, label: t('statuses.retired') },
          ]}
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="asset-start-date">
          {t('modalAssetStartDateLabel')}
        </label>
        <input
          placeholder={t('modalAssetStartDatePlaceholder')}
          className="form-field-field"
          {...register('startDate')}
          id="asset-start-date"
          type="date"
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="asset-insurance-expiry">
          {t('modalAssetInsuranceExpiryLabel')}
        </label>
        <input
          placeholder={t('modalAssetInsuranceExpiryPlaceholder')}
          className="form-field-field"
          {...register('insuranceExpiryDate')}
          id="asset-insurance-expiry"
          type="date"
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="asset-next-maintenance">
          {t('modalAssetNextMaintenanceLabel')}
        </label>
        <input
          placeholder={t('modalAssetNextMaintenancePlaceholder')}
          className="form-field-field"
          {...register('nextMaintenanceDate')}
          id="asset-next-maintenance"
          type="date"
        />
      </div>

      <div className="form-field">
        <label className="form-field-label" htmlFor="asset-responsible">
          {t('modalAssetResponsibleLabel')}
        </label>
        <input
          placeholder={t('modalAssetResponsiblePlaceholder')}
          className="form-field-field"
          {...register('responsibleEmployee')}
          id="asset-responsible"
          type="text"
        />
      </div>

      <div className="form-buttons-wrapper">
        <button onClick={onCancelHandler} className="cancel-button" type="button">
          {t('modalCancelBtn')}
        </button>
        <AddAccommodationButton title={isEditMode ? t('modalEditAssetBtn') : t('modalAddAssetBtn')} />
      </div>
    </form>
  );
};
