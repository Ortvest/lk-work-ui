import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { AddAssetPopup } from '@modules/WorkAssets/layout/AddAssetPopup';
import { EditAssetPopup } from '@modules/WorkAssets/layout/EditAssetPopup';
import { WorkAssetsTableHeader } from '@modules/WorkAssets/layout/Header';
import { WorkAssetsTableContent } from '@modules/WorkAssets/layout/TableContent';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './styles.css';

import { useLazyListWorkAssetsQuery } from '@global/api/workAssets/workAssets';
import { OpenedPopupType } from '@pages/Accommodations';
import { WorkAsset } from '@shared/interfaces/work-asset.interface';

export const WorkAssetsPage = (): React.ReactNode => {
  const [triggerGetAllAssets] = useLazyListWorkAssetsQuery();
  const data = useTypedSelector((state) => state.workAssetReducer.assets);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [openedPopupType, setOpenedPopupType] = useState<OpenedPopupType>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      await triggerGetAllAssets();
    })();
  }, []);
  return (
    <div className="admin-content-wrapper">
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
    </div>
  );
};
