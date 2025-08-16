import React, { useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { EmployeeSlice } from '@global/store/slices/Employee.slice';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './style.css';

import { OpenedPopupType } from '@pages/Accommodations';
import { UserRole } from '@shared/enums/user.enums';
import { isUserEntity } from '@shared/guards/isUserEntity';
import { UserEntity } from '@shared/interfaces/User.interfaces';
import { getRoleLabel } from '@shared/utils/roleTransformer';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

interface EmployeeTableContentProps {
  employees: UserEntity[];
  setIsDrawerOpen: (isOpen: boolean) => void;
  setOpenedPopupType: (type: OpenedPopupType) => void;
}
interface ColumnMetaWithClassName {
  className?: string;
}

type CustomColumnDef<TData> = ColumnDef<TData> & {
  meta?: ColumnMetaWithClassName;
};
const { setSelectedEmployee } = EmployeeSlice.actions;

export const StuffTableContent = ({
  employees,
  setIsDrawerOpen,
  setOpenedPopupType,
}: EmployeeTableContentProps): React.ReactNode => {
  const { t } = useTranslation('employees-table');
  const dispatch = useTypedDispatch();
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const onSelectEmployee = (entity: UserEntity): void => {
    if (isUserEntity(entity)) {
      setIsDrawerOpen(true);
      dispatch(setSelectedEmployee(entity));
      setOpenedPopupType('edit');
    }
  };

  const employeesColumns: CustomColumnDef<UserEntity>[] = [
    {
      header: t('columnFirstName'),
      accessorFn: (row) => row.personalInfo.firstName,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-accommodation-name' },
    },
    {
      header: t('columnLastName'),
      accessorFn: (row) => row.personalInfo.lastName,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-accommodation-address' },
    },
    {
      header: t('columnCompany'),
      accessorFn: (row) => row.jobInfo.company,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-accommodation-price' },
    },
    {
      header: t('columnRole'),
      accessorFn: (row) => row.role,
      cell: (info) => <span>{getRoleLabel(info.getValue() as unknown as UserRole) as string}</span>,
      meta: { className: 'column-accommodation-price' },
    },
    {
      header: t('columnEmail'),
      accessorFn: (row) => row.personalInfo.email,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-accommodation-price' },
    },
  ];

  const table = useReactTable<UserEntity>({
    data: employees,
    columns: employeesColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onSelectEmployee,
    },
  });

  return (
    <table className="employees-table">
      <thead className={classNames('employees-table-content-header')}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={classNames(
                  (header.column.columnDef.meta as ColumnMetaWithClassName)?.className,
                  'employees-table-content-header-item'
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
            className="employees-table-row"
            onMouseEnter={() => setHoveredRowId(row.id)}
            onMouseLeave={() => setHoveredRowId(null)}
            onClick={() => onSelectEmployee(row.original)}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={classNames(
                  (cell.column.columnDef.meta as ColumnMetaWithClassName)?.className,
                  'employees-table-content-header-cell'
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
  );
};
