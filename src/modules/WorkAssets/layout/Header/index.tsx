import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { AddWorkAssetsPopupButton } from '@modules/WorkAssets/features/AddWorkAssetsPopupButton';
import { FindAssetField } from '@modules/WorkAssets/features/FindAssetField';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';

interface WorkAssetsTableHeaderProps {
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}
export const WorkAssetsTableHeader = ({
  setIsOpenedModal,
  setOpenedPopupType,
}: WorkAssetsTableHeaderProps): React.ReactNode => {
  const { t } = useTranslation('work-assets-table');
  return (
    <header className={classNames('employees-table-header-assets')}>
      <section className={classNames('employees-table-header-content')}>
        <div>
          <h1 className={classNames('employees-table-header-title')}>{t('routeWorkAssets')}</h1>
        </div>
      </section>
      <section className={classNames('employees-table-header-content responsive-asset')}>
        <div style={{ alignSelf: 'flex-end' }}>
          <AddWorkAssetsPopupButton setOpenedPopupType={setOpenedPopupType} setIsOpenedModal={setIsOpenedModal} />
        </div>
        <div className={classNames('employees-table-header-toolbar')}>
          <FindAssetField />
        </div>
      </section>
    </header>
  );
};
