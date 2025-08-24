import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { AddAssetPopup } from '@modules/WorkAssets/layout/AddAssetPopup';
import { EditAssetPopup } from '@modules/WorkAssets/layout/EditAssetPopup';
import { WorkAssetsTableHeader } from '@modules/WorkAssets/layout/Header';
import { WorkAssetsTableContent } from '@modules/WorkAssets/layout/TableContent';

import './styles.css';

import { useListWorkAssetsQuery } from '@global/api/workAssets/workAssets';
import { OpenedPopupType } from '@pages/Accommodations';
import { WorkAsset } from '@shared/interfaces/work-asset.interface';

export const mockWorkAssets: WorkAsset[] = [
  {
    _id: '1',
    name: 'HP ProBook Laptop',
    itemType: 'equipment',
    description: 'Work laptop for developer',
    startDate: '2025-01-10',
    insuranceExpiryDate: '2026-01-10',
    lastMaintenanceDate: '2025-05-15',
    nextMaintenanceDate: '2026-05-15',
    responsibleEmployee: 'John Doe',
    status: 'active',
  },
  {
    _id: '2',
    name: 'Office Chair Ergonomic',
    itemType: 'furniture',
    description: 'Ergonomic chair with lumbar support',
    startDate: '2024-09-01',
    insuranceExpiryDate: undefined,
    lastMaintenanceDate: '2025-02-10',
    nextMaintenanceDate: '2026-02-10',
    responsibleEmployee: 'Anna Kowalska',
    status: 'needs_service',
  },
  {
    _id: '3',
    name: 'iPhone 14',
    itemType: 'equipment',
    description: 'Company mobile phone',
    startDate: '2024-03-20',
    insuranceExpiryDate: '2025-03-20',
    lastMaintenanceDate: '2024-12-01',
    nextMaintenanceDate: '2025-12-01',
    responsibleEmployee: 'Petro Shevchenko',
    status: 'active',
  },
  {
    _id: '4',
    name: 'Canon Printer LBP223dw',
    itemType: 'equipment',
    description: 'Office laser printer',
    startDate: '2023-07-01',
    insuranceExpiryDate: '2024-07-01',
    lastMaintenanceDate: '2024-06-20',
    nextMaintenanceDate: '2025-06-20',
    responsibleEmployee: 'IT Department',
    status: 'replaced',
  },
  {
    _id: '5',
    name: 'Company Car Toyota Corolla',
    itemType: 'vehicle',
    description: 'Fleet car for business trips',
    startDate: '2022-05-15',
    insuranceExpiryDate: '2025-05-15',
    lastMaintenanceDate: '2025-01-05',
    nextMaintenanceDate: '2025-07-05',
    responsibleEmployee: 'Marek Nowak',
    status: 'active',
  },
];
export const WorkAssetsPage = (): React.ReactNode => {
  const { data } = useListWorkAssetsQuery();
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [openedPopupType, setOpenedPopupType] = useState<OpenedPopupType>(null);

  useEffect(() => {
    console.log(openedPopupType, 'type');
  }, [openedPopupType]);
  return (
    <div className={classNames('stuff-container')}>
      <WorkAssetsTableHeader setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
      <WorkAssetsTableContent
        setOpenedPopupType={setOpenedPopupType}
        assets={(data || []) as unknown as WorkAsset[]}
        setIsOpenedModal={setIsOpenedModal}
      />
      {openedPopupType === 'create' ? (
        <AddAssetPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
      ) : (
        <EditAssetPopup isOpen={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
      )}
    </div>
  );
};
