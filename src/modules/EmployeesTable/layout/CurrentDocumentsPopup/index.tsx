import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedButton } from '@shared/components/SharedButton';

import DownLoadIcon from '@shared/assets/icons/DownloadIcon.svg';
import IconRefresh from '@shared/assets/icons/IconRefresh.svg';
import IconSave from '@shared/assets/icons/IconSave.svg';

import './styles.css';

import { useLazyFetchAllEmployeesQuery } from '@global/api/employee/employee.api';
import { useUploadPdfMutation } from '@global/api/pdf/pdf.api';
import { UserRoles, UserWorkStatuses } from '@shared/enums/user.enums';
import { UserEntity } from '@shared/interfaces/User.interfaces';

interface CurrentDocumentsPopupProps {
  isExpireModalOpen: boolean;
  setIsExpireModalOpen: (isExpireModalOpen: boolean) => void;
  selectedEmployeeExpire: UserEntity | null;
}

function getContractName(fileKey: string): string {
  if (!fileKey) return '';
  // беремо останній сегмент, якщо це URL
  const last = fileKey.split('/').pop() || fileKey;
  const parts = last.split('-');
  return parts
    .slice(1)
    .join('-')
    .replace(/_\d{2}\.\d{2}\.\d{4}_\d{2}_\d{2}/, '');
}

const toIdString = (id: unknown): string => (id ?? '').toString().trim();

export const CurrentDocumentsPopup = ({
  isExpireModalOpen,
  setIsExpireModalOpen,
  selectedEmployeeExpire,
}: CurrentDocumentsPopupProps): React.ReactNode => {
  const { t } = useTranslation('employees-table');
  const [triggerUploadPdf] = useUploadPdfMutation();
  const [triggerFetchAllEmployees] = useLazyFetchAllEmployeesQuery();
  const user = useTypedSelector((state) => state.userReducer.user);
  const inputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});

  const [contracts, setContracts] = useState(selectedEmployeeExpire?.jobInfo?.jobContracts || []);
  const [file, setFile] = useState<Record<string, File | null>>({});
  const [temporaryFileNames, setTemporaryFileNames] = useState<Record<string, string>>({});
  const [, setUploadingContractId] = useState<string | null>(null);

  useEffect(() => {
    setContracts(selectedEmployeeExpire?.jobInfo?.jobContracts || []);
    setFile({});
    setTemporaryFileNames({});
    inputRefs.current = {};
    setUploadingContractId(null);
  }, [selectedEmployeeExpire]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleFileChange = (rowKey: string, f?: File) => {
    if (!f) return;
    setTemporaryFileNames((prev) => ({ ...prev, [rowKey]: f.name }));
    setFile((prev) => ({ ...prev, [rowKey]: f }));
  };

  const handleUpload = async (contractIdRaw: string, rowKey: string): Promise<void> => {
    const currentFile = file[rowKey];
    if (!currentFile) {
      toast.error(t('toastFileNotSelected'));
      return;
    }

    const contractId = toIdString(contractIdRaw);
    console.log(contractIdRaw, 'contractIdRaw');
    if (!contractId) {
      toast.error('Missing contractId for upload');
      return;
    }

    try {
      const response = await triggerUploadPdf({
        file: currentFile,
        userId: toIdString(selectedEmployeeExpire?._id || ''),
        contractId,
      }).unwrap();

      toast.success(t('toastPdfUploadSuccess', { fileName: currentFile.name }), {
        style: { background: '#e6ffed', color: '#0f5132', textAlign: 'center' },
      });

      setIsExpireModalOpen(false);
      if (user?.role === UserRoles.SUPER_ADMIN) {
        await triggerFetchAllEmployees({
          company: '',
          workStatus: UserWorkStatuses.WORKING,
          fullName: '',
        });
      } else {
        setContracts((prev) =>
          prev.map((c) => (toIdString(c._id) === contractId ? { ...c, contractUrl: response.fileUrl } : c))
        );
      }

      setFile((prev) => ({ ...prev, [rowKey]: null }));
      setTemporaryFileNames((prev) => {
        const updated = { ...prev };
        delete updated[rowKey];
        return updated;
      });
      setUploadingContractId(null);
    } catch (err) {
      console.error('Upload failed', err);
      toast.error(t('toastPdfUploadError', { fileName: currentFile.name }), {
        style: { background: '#ffe6e6', color: '#842029', textAlign: 'center' },
      });
    }
  };

  return (
    <ReactModal
      isOpen={isExpireModalOpen}
      ariaHideApp={false}
      overlayClassName="add-employee-popup-overlay"
      className={classNames('add-employee-popup-container')}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}>
      <div className={classNames('current-documents-content-wrapper')}>
        <div className={classNames('current-documents-title-wrapper')}>
          <h2>{t('currentDocumentsTitle')}</h2>
        </div>

        {contracts.map((contract: any, idx: number) => {
          const rowKey = toIdString(contract._id) || `idx-${idx}`;
          const tempName = temporaryFileNames[rowKey] || '';
          const currentFile = file[rowKey] || null;
          const hasUploaded = !!contract.contractUrl;

          return (
            <div key={rowKey} className="contract-item">
              <div className="contract-info">
                <span className="contract-name">
                  {tempName ? tempName : hasUploaded ? getContractName(contract?.contractUrl || '') : t('needUpload')}
                </span>
                <span className="contract-date">
                  Ends:{' '}
                  {contract.employmentEndDate
                    ? dayjs(contract.employmentEndDate, ['DD-MM-YYYY', 'YYYY-MM-DD']).format('DD.MM.YY')
                    : '—'}
                </span>
              </div>

              {currentFile ? (
                <div style={{ display: 'flex' }}>
                  <img
                    className="shared-img-preview-download-icon"
                    src={IconSave}
                    alt="save-icon"
                    onClick={() => {
                      handleUpload(toIdString(contract._id || ''), rowKey);
                    }}
                  />
                  <img
                    className="shared-img-preview-download-icon"
                    src={IconRefresh}
                    alt="refresh-icon"
                    onClick={() => inputRefs.current[rowKey]?.click()}
                  />
                  <input
                    ref={(el) => (inputRefs.current[rowKey] = el)}
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(rowKey, e.target.files?.[0])}
                  />
                </div>
              ) : hasUploaded ? (
                // Уже завантажений → Download + Refresh
                <div style={{ display: 'flex' }}>
                  <img
                    className="shared-img-preview-download-icon"
                    src={DownLoadIcon}
                    alt="download-icon"
                    onClick={() => {
                      if (contract.contractUrl) {
                        window.open(contract.contractUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  />
                  <img
                    className="shared-img-preview-download-icon"
                    src={IconRefresh}
                    alt="refresh-icon"
                    onClick={() => inputRefs.current[rowKey]?.click()}
                  />
                  <input
                    ref={(el) => (inputRefs.current[rowKey] = el)}
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(rowKey, e.target.files?.[0])}
                  />
                </div>
              ) : (
                // Порожньо → кнопка Upload
                <label className="contract-btn upload">
                  {t('uploadBtn')}
                  <input
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(rowKey, e.target.files?.[0])}
                  />
                </label>
              )}
            </div>
          );
        })}

        <SharedButton type="button" onClick={() => setIsExpireModalOpen(false)} text={t('modalCancelBtn')} />
      </div>
    </ReactModal>
  );
};
