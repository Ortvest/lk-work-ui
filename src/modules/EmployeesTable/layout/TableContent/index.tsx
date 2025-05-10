import React from 'react';

import classNames from 'classnames';

import IconDots from '@shared/assets/icons/IconDots.svg';

import './style.css';

import { UserEntity } from '@shared/interfaces/User.interfaces';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const columns: ColumnDef<UserEntity>[] = [
  {
    header: 'Employee',
    accessorFn: (row) => `${row.personalInfo.firstName} ${row.personalInfo.lastName}`,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-employee' },
  },
  {
    header: 'Status',
    accessorKey: 'workStatus',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    cell: (info) => {
      const value = info.getValue() as string;
      return <span className={`status ${value.replace(/\s/g, '-').toLowerCase()}`}>{value.toUpperCase()}</span>;
    },
    meta: { className: 'column-status' },
  },
  {
    header: 'Citizenship',
    accessorFn: (row) => row.personalInfo.nationality,
    meta: { className: 'column-citizenship' },
  },
  {
    header: 'The contract will expire',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    cell: ({ row }) => {
      const end = new Date(row.original.jobInfo.employmentEndDate as string);
      const today = new Date();
      const diffMs = end.getTime() - today.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      let label = '—';
      let dotColor = 'dot-gray';

      if (!isNaN(diffDays)) {
        if (diffDays < 0) {
          label = `${diffDays} days`;
          dotColor = 'dot-red';
        } else if (diffDays < 30) {
          label = `${diffDays} days`;
          dotColor = 'dot-orange';
        } else if (diffDays < 60) {
          label = `${Math.round(diffDays / 30)} months`;
          dotColor = 'dot-yellow';
        } else {
          label = `${Math.round(diffDays / 30)} months`;
          dotColor = 'dot-green';
        }
      }

      return (
        <div className="contract-expire">
          <span className={`contract-expire-dot ${dotColor}`} />
          <span className="contract-expire-label">{label}</span>
        </div>
      );
    },
    meta: { className: 'column-expire' },
  },
  {
    header: 'Hire Date',
    accessorFn: (row) => row.jobInfo.employmentStartDate,
    meta: { className: 'column-hire-date' },
  },
  {
    header: 'Action',
    cell: () => (
      <div className="employees-table-action-cell">
        <button className="action-button">
          <img src={IconDots} alt="IconDots" />
        </button>
      </div>
    ),
    meta: { className: 'column-action' },
  },
];

interface EmployeeTableContentProps {
  employees: UserEntity[];
}
export const EmployeesTableContent = ({ employees }: EmployeeTableContentProps): React.ReactNode => {
  console.log(employees, 'employees');
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
          <tr key={row.id} className="employees-table-row">
            {row?.getVisibleCells()?.map((cell: any) => (
              <td
                key={cell.id}
                className={classNames(cell.column.columnDef.meta?.className, 'employees-table-content-header-cell')}>
                {flexRender(cell?.column?.columnDef?.cell, cell?.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
