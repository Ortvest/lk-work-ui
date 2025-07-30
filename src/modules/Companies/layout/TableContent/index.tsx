import React, { useState } from 'react';

import classNames from 'classnames';

import { WorkCompanySlice } from '@global/store/slices/WorkCompany.slice';

import { ContactPersonHoverCard } from '@modules/Companies/layout/ContactPersonHoverCard';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';
import { WorkCompanyEntity } from '@shared/interfaces/WorkCompanies.interfaces';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export const companyColumns: ColumnDef<WorkCompanyEntity>[] = [
  {
    header: 'Company',
    accessorFn: (row) => row.name,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-accommodation-name' },
  },
  {
    header: 'Address',
    accessorFn: (row) => row.address,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-accommodation-address' },
  },
  {
    header: 'Phone Number',
    accessorFn: (row) => row.phoneNumber,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-accommodation-price' },
  },
  {
    header: 'Email',
    accessorFn: (row) => row.email,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-accommodation-price' },
  },
  {
    header: 'Contact Person',
    accessorFn: (row) => `${row.contactPerson.personFirstName} ${row.contactPerson.personSecondName}`,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
    cell: (info: any) => {
      const row = info.row.original as WorkCompanyEntity;
      const rowId = info.row.id;

      const {
        hoveredContactRowId,
        setHoveredContactRowId,
      }: { hoveredContactRowId?: string; setHoveredContactRowId?: (id: string | null) => void } =
        info.table.options.meta || {};
      const isHovered = hoveredContactRowId === rowId;

      return (
        <div className="contact-person-cell" style={{ position: 'relative' }}>
          <span
            className="contact-person-name"
            onMouseEnter={() => setHoveredContactRowId?.(rowId)}
            onMouseLeave={() => setHoveredContactRowId?.(null)}>
            {row.contactPerson.personFirstName} {row.contactPerson.personSecondName}
          </span>
          {isHovered && (
            <ContactPersonHoverCard
              position={row.contactPerson.personPosition}
              tel={row.phoneNumber}
              email={row.contactPerson.personEmail}
            />
          )}
        </div>
      );
    },
    meta: { className: 'column-accommodation-price' },
  },
  {
    header: 'NIP',
    accessorFn: (row) => row.nip,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-accommodation-price' },
  },
];

interface EmployeeTableContentProps {
  companies: WorkCompanyEntity[];
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}

const { setSelectedWorkCompany } = WorkCompanySlice.actions;

export const CompanyTableContent = ({
  companies,
  setOpenedPopupType,
  setIsOpenedModal,
}: EmployeeTableContentProps): React.ReactNode => {
  const dispatch = useTypedDispatch();
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [hoveredContactRowId, setHoveredContactRowId] = useState<string | null>(null);

  const onSelectAccommodation = (entity: WorkCompanyEntity): void => {
    dispatch(setSelectedWorkCompany(entity));
    setOpenedPopupType('edit');
    setIsOpenedModal(true);
  };

  type TableData = WorkCompanyEntity[];

  const table = useReactTable<TableData>({
    data: companies as unknown as TableData[],
    columns: companyColumns as unknown as ColumnDef<TableData>[],
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onSelectAccommodation,
      setOpenedPopupType,
      setIsOpenedModal,
      hoveredContactRowId,
      setHoveredContactRowId,
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
            onClick={() => onSelectAccommodation(row.original as unknown as WorkCompanyEntity)}>
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
