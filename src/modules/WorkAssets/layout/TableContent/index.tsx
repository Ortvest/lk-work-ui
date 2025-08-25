import React, { useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import './style.css';

import { useLazyGetWorkAssetByIdQuery } from '@global/api/workAssets/workAssets';
import { OpenedPopupType } from '@pages/Accommodations';
import { WorkAsset } from '@shared/interfaces/work-asset.interface';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

interface WorkAssetsTableContentProps {
  assets: WorkAsset[];
  setOpenedPopupType: (type: OpenedPopupType) => void;
  setIsOpenedModal: (isOpen: boolean) => void;
}
interface ColumnMetaWithClassName {
  className?: string;
}

type CustomColumnDef<TData> = ColumnDef<TData> & {
  meta?: ColumnMetaWithClassName;
};

export const WorkAssetsTableContent = ({
  assets,
  setOpenedPopupType,
  setIsOpenedModal,
}: WorkAssetsTableContentProps): React.ReactNode => {
  const { t } = useTranslation('work-assets-table');
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const [triggerGetSelectedAsset] = useLazyGetWorkAssetByIdQuery();
  const assetsColumns: CustomColumnDef<WorkAsset>[] = [
    {
      header: t('columnName', { ns: 'work-assets-table' }),
      accessorFn: (row) => row.name,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-asset-name' },
    },
    {
      header: t('columnType', { ns: 'work-assets-table' }),
      accessorFn: (row) => row.itemType,
      cell: (info) => <span>{t(`types.${info.getValue() as string}`, { ns: 'work-assets-table' })}</span>,
      meta: { className: 'column-asset-type' },
    },
    {
      header: t('columnStatus', { ns: 'work-assets-table' }),
      accessorFn: (row) => row.status,
      cell: (info) => <span>{t(`statuses.${info.getValue() as string}`, { ns: 'work-assets-table' })}</span>,
      meta: { className: 'column-asset-status' },
    },
    {
      header: t('columnStartDate', { ns: 'work-assets-table' }),
      accessorFn: (row) => row.startDate,
      cell: (info) => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
      meta: { className: 'column-asset-date' },
    },
    {
      header: t('columnNextMaintenance', { ns: 'work-assets-table' }),
      accessorFn: (row) => row.nextMaintenanceDate,
      cell: ({ row }): JSX.Element => {
        const rawDate = row.original.nextMaintenanceDate as string;
        console.log(row.original, 'RORR');
        if (!rawDate) return <span>-</span>;

        const end = dayjs(rawDate);
        const today = dayjs();

        const diffDays = end.diff(today, 'day');

        let label = dayjs(rawDate).format('DD.MM.YYYY');
        let dotColor = '';

        if (!isNaN(diffDays)) {
          if (diffDays < 0) {
            label = t('expireDays', { days: Math.abs(diffDays) });
            dotColor = 'dot-red';
          } else if (diffDays < 30) {
            label = t('expireDays', { days: diffDays });
            dotColor = diffDays < 7 ? 'dot-red' : diffDays < 15 ? 'dot-orange' : 'dot-yellow';
          }
        }

        return (
          <div className="contract-expire">
            {dotColor && <span className={`contract-expire-dot ${dotColor}`} />}
            <span className="contract-expire-label">{label}</span>
          </div>
        );
      },
      meta: { className: 'column-asset-date' },
    },
    {
      header: t('columnResponsible', { ns: 'work-assets-table' }),
      accessorFn: (row) => row.responsibleEmployee,
      cell: (info) => <span>{info.getValue() ? (info.getValue() as string) : '-'}</span>,
      meta: { className: 'column-asset-responsible' },
    },
  ];

  const onSelectAsset = async (id: string): Promise<void> => {
    setOpenedPopupType('edit');
    setIsOpenedModal(true);
    await triggerGetSelectedAsset(id);
  };
  const table = useReactTable<WorkAsset>({
    data: assets,
    columns: assetsColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      setOpenedPopupType,
      setIsOpenedModal,
    },
  });

  return (
    <div className="assets-table-wrapper">
      <table className="assets-table">
        <thead className={classNames('assets-table-content-header')}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={classNames(
                    (header.column.columnDef.meta as ColumnMetaWithClassName)?.className,
                    'assets-table-content-header-item'
                  )}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="assets-table-row"
              onMouseEnter={() => setHoveredRowId(row.id)}
              onMouseLeave={() => setHoveredRowId(null)}
              onClick={() => {
                onSelectAsset(row.original._id);
              }}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={classNames(
                    (cell.column.columnDef.meta as ColumnMetaWithClassName)?.className,
                    'assets-table-content-header-cell'
                  )}>
                  {flexRender(cell.column.columnDef.cell, {
                    ...cell.getContext(),
                    hoveredRowId,
                    currentRowId: row.id,
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
