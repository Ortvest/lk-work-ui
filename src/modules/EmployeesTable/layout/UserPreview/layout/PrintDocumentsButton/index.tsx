import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import IconPrint from '@shared/assets/icons/IconPrint.svg';

import './style.css';

interface PrintDocumentsButtonProps {
  setIsUserDocumentsDrawerOpen: (isOpen: boolean) => void;
}

export const PrintDocumentsButton = ({ setIsUserDocumentsDrawerOpen }: PrintDocumentsButtonProps): React.ReactNode => {
  const { t } = useTranslation('employees-table');

  const onOpenUserDocuments = (): void => setIsUserDocumentsDrawerOpen(true);

  return (
    <button
      onClick={onOpenUserDocuments}
      className={classNames('print-documents-button')}
      aria-label={t('cardPrintDocument')}>
      <img src={IconPrint} alt="" />
      <span>{t('cardPrintDocument')}</span>
    </button>
  );
};
