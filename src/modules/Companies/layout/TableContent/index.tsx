import React, { useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { WorkCompanySlice } from '@global/store/slices/WorkCompany.slice';

import { ContactPersonHoverCard } from '@modules/Companies/layout/ContactPersonHoverCard';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';
import { WorkCompanyEntity } from '@shared/interfaces/WorkCompanies.interfaces';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export const CompanyTableContent = ({
  companies,
  setOpenedPopupType,
  setIsOpenedModal,
}: {
  companies: WorkCompanyEntity[];
  setIsOpenedModal: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}): React.ReactNode => {
  const { t } = useTranslation('companies');
  const dispatch = useTypedDispatch();
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [hoveredContactRowId, setHoveredContactRowId] = useState<string | null>(null);

  const { setSelectedWorkCompany } = WorkCompanySlice.actions;

  const onSelectCompany = (entity: WorkCompanyEntity): void => {
    dispatch(setSelectedWorkCompany(entity));
    setOpenedPopupType('edit');
    setIsOpenedModal(true);
  };

  const companyColumns: ColumnDef<WorkCompanyEntity>[] = [
    {
      header: t('columnCompanyName'),
      accessorFn: (row) => row.name,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-company-name' },
    },
    {
      header: t('columnCompanyAddress'),
      accessorFn: (row) => row.address,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-company-address' },
    },
    {
      header: t('columnCompanyPhone'),
      accessorFn: (row) => row.phoneNumber,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-company-phone' },
    },
    {
      header: t('columnCompanyEmail'),
      accessorFn: (row) => row.email,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-company-email' },
    },
    {
      header: t('columnCompanyContactPerson'),
      accessorFn: (row) => `${row.contactPerson.personFirstName} ${row.contactPerson.personSecondName}`,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      cell: (info: any) => {
        const row = info.row.original as WorkCompanyEntity;
        const rowId = info.row.id;

        const { hoveredContactRowId, setHoveredContactRowId } = info.table.options.meta || {};
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
      meta: { className: 'column-company-contact-person' },
    },
    {
      header: t('columnCompanyNip'),
      accessorFn: (row) => row.nip,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-company-nip' },
    },
  ];

  type TableData = WorkCompanyEntity[];

  const table = useReactTable<TableData>({
    data: companies as unknown as TableData[],
    columns: companyColumns as unknown as ColumnDef<TableData>[],
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onSelectCompany,
      setOpenedPopupType,
      setIsOpenedModal,
      hoveredContactRowId,
      setHoveredContactRowId,
    },
  });

  return (
    <div className="employees-table-wrapper-comp">
      <table className="employees-table-comp">
        <thead className={classNames('employees-table-content-header')}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  className={classNames(
                    header.column.columnDef.meta?.className,
                    'employees-table-content-header-item'
                  )}>
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
              onClick={() => onSelectCompany(row.original as unknown as WorkCompanyEntity)}>
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
    </div>
  );
};
