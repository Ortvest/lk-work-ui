import React, { useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { AccommodationSlice } from '@global/store/slices/Accommodation.slice';
import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';
import { AccommodationEntity } from '@shared/interfaces/Accommodation.interfaces';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export const accommodationsColumns = (t: (key: string) => string): ColumnDef<AccommodationEntity>[] => [
  {
    header: t('columnAccommodationName'),
    accessorFn: (row) => row.name,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-accommodation-name' },
  },
  {
    header: t('columnAccommodationAddress'),
    accessorFn: (row) => row.address,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-accommodation-address' },
  },
  {
    header: t('columnAccommodationPrice'),
    accessorFn: (row) => row.price,
    cell: (info) => <span>{`${info.getValue() as string} zl/month`}</span>,
    meta: { className: 'column-accommodation-price' },
  },
];

interface EmployeeTableContentProps {
  accommodations: AccommodationEntity[];
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}

const { setSelectedAccommodation } = AccommodationSlice.actions;

export const AccommodationTableContent = ({
                                            accommodations,
                                            setOpenedPopupType,
                                            setIsOpenedModal,
                                          }: EmployeeTableContentProps): React.ReactNode => {
  const { t } = useTranslation('accommodations');
  const dispatch = useTypedDispatch();
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const onSelectAccommodation = (entity: AccommodationEntity): void => {
    dispatch(setSelectedAccommodation(entity));
    setOpenedPopupType('edit');
    setIsOpenedModal(true);
  };

  type TableData = AccommodationEntity[];

  const table = useReactTable<TableData>({
    data: accommodations as unknown as TableData[],
    columns: accommodationsColumns(t) as unknown as ColumnDef<TableData>[],
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onSelectAccommodation,
      setOpenedPopupType,
      setIsOpenedModal,
    },
  });

  return (
    <table className="employees-table">
      <thead className={classNames('employees-table-content-header')}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => (
            <th
              key={header.id}
              className={classNames(header.column.columnDef.meta?.className, 'employees-table-content-header-item')}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody>
      {table?.getRowModel()?.rows?.map((row) => (
        <tr
          key={row.id}
          className="employees-table-row"
          onMouseEnter={() => setHoveredRowId(row.id)}
          onMouseLeave={() => setHoveredRowId(null)}
          onClick={() => onSelectAccommodation(row.original as unknown as AccommodationEntity)}>
          {row?.getVisibleCells()?.map((cell: any) => (
            <td
              key={cell.id}
              className={classNames(cell.column.columnDef.meta?.className, 'employees-table-content-header-cell')}>
              {flexRender(cell?.column?.columnDef?.cell, {
                ...cell?.getContext(),
                hoveredRowId,
                currentRowId: row.id,
                setOpenedPopupType,
                setIsOpenedModal,
              })}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
};
