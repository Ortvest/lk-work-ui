import React, { useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

import { EmployeeSlice } from '@global/store/slices/Employee.slice';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { Loader } from '@shared/components/Loader';

import IconDots from '@shared/assets/icons/IconDots.svg';

import './style.css';

import {
  useHandleVacationRequestsMutation,
  useLazyFetchVacationRequestsQuery,
} from '@global/api/employee/employee.api';
import { EmployeeTableTab, EmployeeTableTabs } from '@shared/enums/general.enums';
import { VacationFilters } from '@shared/enums/vacation.enums';
import { isUserEntity } from '@shared/guards/isUserEntity';
import { UserEntity } from '@shared/interfaces/User.interfaces';
import { VacationDecision, VacationRequestsResponse } from '@shared/interfaces/Vacation.interfaces';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const employeesColumns: ColumnDef<UserEntity>[] = [
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
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
    cell: ({ hoveredRowId, currentRowId, selectedTable }) => {
      if (selectedTable === 'vacation-requests' && hoveredRowId === currentRowId) {
        return (
          <div className="employees-table-row-actions" style={{ display: 'flex', gap: '8px' }}>
            <button className="action-cancel-btn">Cancel</button>
            <button className="action-approve-btn">Approve</button>
          </div>
        );
      }

      return (
        <div className="employees-table-action-cell">
          <button className="action-button">
            <img src={IconDots} alt="IconDots" />
          </button>
        </div>
      );
    },
    meta: { className: 'column-action' },
  },
];

export const vacationRequestsColumns: ColumnDef<VacationRequestsResponse>[] = [
  {
    header: 'Requests Date',
    accessorKey: 'createdAt',
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
    cell: (info) => {
      const date = info.getValue() as string;
      return <span>{dayjs(date).format('DD.MM.YYYY')}</span>;
    },
    meta: { className: 'column-hire-date' },
  },
  {
    header: 'First Name',
    accessorFn: (row) => row.user.firstName,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-first-name' },
  },
  {
    header: 'Last Name',
    accessorFn: (row) => row.user.lastName,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-last-name' },
  },
  {
    header: 'Citizenship',
    accessorFn: (row) => row.user.nationality,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-vacation-citizenship' },
  },
  {
    header: 'Company',
    accessorFn: (row) => row.user.company,
    cell: (info) => <span>{info.getValue() as string}</span>,
    meta: { className: 'column-company' },
  },
  {
    header: 'Vacation period',
    accessorFn: (row) => row.vacationDates,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
    cell: (info) => {
      const dates = info.getValue() as string[];

      return (
        <>
          {dates.map((date, idx) => (
            <span key={idx}>
              {date}
              {idx !== dates.length - 1 && <span style={{ color: '#A0A0A0', margin: '0 4px' }}>/</span>}
            </span>
          ))}
        </>
      );
    },
    meta: { className: 'column-vacation-period' },
  },

  {
    header: 'Action',
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
    cell: ({ row, hoveredRowId, currentRowId, selectedTable, table }) => {
      const isHovered = selectedTable === 'vacation-requests' && hoveredRowId === currentRowId;

      return (
        <div className="employees-table-action-cell" style={{ position: 'relative', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}>
            <button
              className="action-cancel-btn"
              onClick={(e) => {
                e.stopPropagation();
                (table.options.meta as any)?.onSelectEmployee(row.original, 'rejected');
              }}>
              Cancel
            </button>
            <button
              className="action-approve-btn"
              onClick={(e) => {
                e.stopPropagation();
                (table.options.meta as any)?.onSelectEmployee(row.original, 'approved');
              }}>
              Approve
            </button>
          </div>
        </div>
      );
    },
    meta: { className: 'column-action' },
  },
];
interface EmployeeTableContentProps {
  employees: UserEntity[];
  vacationRequests: VacationRequestsResponse[];
  setIsDrawerOpen: (isOpen: boolean) => void;
  selectedTable: EmployeeTableTab;
  setVacationRequestsCount: React.Dispatch<React.SetStateAction<number>>;
}

const { setSelectedEmployee } = EmployeeSlice.actions;

export const EmployeesTableContent = ({
  employees,
  setIsDrawerOpen,
  selectedTable,
  vacationRequests,
  setVacationRequestsCount,
}: EmployeeTableContentProps): React.ReactNode => {
  const dispatch = useTypedDispatch();
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const [fetchAllVacationRequests] = useLazyFetchVacationRequestsQuery();

  const currentUserData = useTypedSelector((state) => state.userReducer.user);
  const [handleVacationRequest, { isLoading: isHandleLoading }] = useHandleVacationRequestsMutation();

  const onSelectEmployee = (entity: UserEntity | VacationRequestsResponse, decision?: VacationDecision): void => {
    if (isUserEntity(entity)) {
      setIsDrawerOpen(true);
      dispatch(setSelectedEmployee(entity));
    } else {
      handleVacationRequest({
        vacationRequestId: entity._id,
        reviewerId: currentUserData?._id || '',
        userId: entity.userId,
        decision: decision as VacationDecision,
      }).then(() => {
        fetchAllVacationRequests(VacationFilters.VACATION_REQUESTS).then((response) =>
          setVacationRequestsCount(response.data?.length as number)
        );

        if (decision === 'approved') {
          toast.success('Vacation request approved successfully');
        } else if (decision === 'rejected') {
          toast.success('Vacation request rejected successfully');
        }
      });
    }
  };

  const isVacation =
    selectedTable === EmployeeTableTabs.VACATION_REQUESTS || selectedTable === EmployeeTableTabs.ON_VACATION;

  type TableData = typeof isVacation extends true ? VacationRequestsResponse : UserEntity;

  const table = useReactTable<TableData>({
    data: isVacation ? (vacationRequests as unknown as TableData[]) : (employees as TableData[]),
    columns: isVacation
      ? (vacationRequestsColumns as ColumnDef<TableData>[])
      : (employeesColumns as ColumnDef<TableData>[]),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onSelectEmployee,
    },
  });

  if (isHandleLoading) {
    return <Loader />;
  }
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
            onClick={() => onSelectEmployee(row.original)}>
            {row?.getVisibleCells()?.map((cell: any) => (
              <td
                key={cell.id}
                className={classNames(cell.column.columnDef.meta?.className, 'employees-table-content-header-cell')}>
                {flexRender(cell?.column?.columnDef?.cell, {
                  ...cell?.getContext(),
                  hoveredRowId,
                  currentRowId: row.id,
                  selectedTable,
                })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
