import React, { useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { EmployeeSlice } from '@global/store/slices/Employee.slice';

import { CurrentDocumentsPopup } from '@modules/EmployeesTable/layout/CurrentDocumentsPopup';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { Loader } from '@shared/components/Loader';

import IconDots from '@shared/assets/icons/IconDots.svg';

import './style.css';

import {
  useHandleVacationRequestsMutation,
  useLazyFetchVacationRequestsQuery,
  useLazyRemoveVacationQuery,
} from '@global/api/employee/employee.api';
import { EmployeeTableTab, EmployeeTableTabs } from '@shared/enums/general.enums';
import { VacationFilters } from '@shared/enums/vacation.enums';
import { isUserEntity } from '@shared/guards/isUserEntity';
import { UserEntity } from '@shared/interfaces/User.interfaces';
import { VacationDecision, VacationRequestsResponse } from '@shared/interfaces/Vacation.interfaces';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const { setSelectedEmployee } = EmployeeSlice.actions;

interface EmployeeTableContentProps {
  employees: UserEntity[];
  vacationRequests: VacationRequestsResponse[];
  setIsDrawerOpen: (isOpen: boolean) => void;
  selectedTable: EmployeeTableTab;
  setVacationRequestsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const EmployeesTableContent = ({
  employees,
  setIsDrawerOpen,
  selectedTable,
  vacationRequests,
  setVacationRequestsCount,
}: EmployeeTableContentProps): React.ReactNode => {
  const { t } = useTranslation('employees-table');

  const dispatch = useTypedDispatch();
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [isExpireModalOpen, setIsExpireModalOpen] = useState(false);
  const [selectedEmployeeExpire, setSelectedEmployeeExpire] = useState<UserEntity | null>(null);

  const [fetchAllVacationRequests] = useLazyFetchVacationRequestsQuery();
  const [removeVacation] = useLazyRemoveVacationQuery();
  const currentUserData = useTypedSelector((state) => state.userReducer.user);
  const [handleVacationRequest, { isLoading: isHandleLoading }] = useHandleVacationRequestsMutation();

  const onRemoveVacation = async (id: string): Promise<void> => {
    await removeVacation({ vacationId: id });
    await fetchAllVacationRequests(VacationFilters.ON_VACATION);
  };
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
          toast.success(t('toastVacationApproved'));
        } else if (decision === 'rejected') {
          toast.success(t('toastVacationRejected'));
        }
      });
    }
  };

  const formatDate = (date: string | undefined | null): string => {
    if (!date) return '-';
    const [day, month, year] = date.split('-');
    if ((day === '00' && month === '00') || !year) {
      return '-';
    }
    return date;
  };

  const isVacation =
    selectedTable === EmployeeTableTabs.VACATION_REQUESTS || selectedTable === EmployeeTableTabs.ON_VACATION;

  type TableData = typeof isVacation extends true ? VacationRequestsResponse : UserEntity;

  const employeesColumns: ColumnDef<UserEntity>[] = [
    {
      header: t('columnEmployee'),
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      accessorFn: (row) => {
        const first = row.personalInfo?.firstName ?? '';
        const last = row.personalInfo?.lastName ?? '';
        return `${first} ${last}`.trim() || '-';
      },
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-employee' },
    },
    {
      header: t('columnCompany'),
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      accessorFn: (row) => row.jobInfo.company,
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-employee' },
    },
    {
      header: t('columnStatus'),
      accessorKey: 'workStatus',
      cell: (info): JSX.Element => {
        const value = (info.getValue() as string) ?? '-';
        return <span className={`status ${value.replace(/\s/g, '-').toLowerCase()}`}>{value.toUpperCase()}</span>;
      },
      meta: { className: 'column-status' },
    },
    {
      header: t('columnCitizenship'),
      accessorFn: (row): string => {
        const nationality = row.personalInfo?.nationality ?? '';
        return nationality ? nationality.charAt(0).toUpperCase() + nationality.slice(1) : '-';
      },
      meta: { className: 'column-citizenship' },
    },
    {
      header: t('columnContractExpire'),
      cell: ({ row }): JSX.Element => {
        const rawDate = row.original.jobInfo.employmentEndDate as string;
        if (!rawDate) {
          return (
            <div className="contract-expire">
              <span className="contract-expire-dot dot-gray" />
              <span className="contract-expire-label">—</span>
            </div>
          );
        }

        const end = dayjs(rawDate, 'DD-MM-YYYY');
        const today = dayjs();
        const diffDays = end.diff(today, 'day');

        let label = '—';
        let dotColor = 'dot-gray';

        if (!isNaN(diffDays)) {
          if (diffDays < 0) {
            label = t('expireDays', { days: Math.abs(diffDays) });
            dotColor = 'dot-red';
          } else if (diffDays < 30) {
            label = t('expireDays', { days: diffDays });
            dotColor = 'dot-orange';
          } else {
            const months = end.diff(today, 'month');
            label = t('expireMonths', { months });
            dotColor = diffDays < 60 ? 'dot-yellow' : 'dot-green';
          }
        }

        return (
          <div
            className="contract-expire"
            onClick={(e) => {
              e.stopPropagation();
              (table.options.meta as any)?.setSelectedEmployeeExpire?.(row.original);
              (table.options.meta as any)?.setIsExpireModalOpen?.(true);
            }}
            style={{ cursor: 'pointer' }}>
            <span className={`contract-expire-dot ${dotColor}`} />
            <span className="contract-expire-label">{label}</span>
          </div>
        );
      },
      meta: { className: 'column-expire' },
    },
    {
      header: t('columnHireDate'),
      accessorFn: (row) => formatDate(row.jobInfo.employmentStartDate as string),
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-hire-date' },
    },

    {
      header: t('columnAction'),
      // @ts-ignore
      cell: ({ hoveredRowId, currentRowId, selectedTable }): JSX.Element => {
        if (selectedTable === 'vacation-requests' && hoveredRowId === currentRowId) {
          return (
            <div className="employees-table-row-actions" style={{ display: 'flex', gap: '8px' }}>
              <button className="action-cancel-btn">{t('btnCancel')}</button>
              <button className="action-approve-btn">{t('btnApprove')}</button>
            </div>
          );
        }

        return (
          <div className="employees-table-action-cell">
            <button className="action-button" aria-label={t('columnAction')}>
              <img src={IconDots} alt="More" />
            </button>
          </div>
        );
      },
      meta: { className: 'column-action' },
    },
  ];

  const vacationRequestsColumns: ColumnDef<VacationRequestsResponse>[] = [
    {
      header: t('columnRequestsDate'),
      accessorKey: 'createdAt',
      cell: (info): JSX.Element => {
        const date = info.getValue() as string;
        return <span>{date ? dayjs(date).format('DD.MM.YYYY') : '-'}</span>;
      },
      meta: { className: 'column-hire-date' },
    },
    {
      header: t('columnFirstName'),
      accessorFn: (row) => row.user?.firstName ?? '-',
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-first-name' },
    },
    {
      header: t('columnLastName'),
      accessorFn: (row) => row.user?.lastName ?? '-',
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-last-name' },
    },
    {
      header: t('columnCitizenship'),
      accessorFn: (row) => row.user?.nationality ?? '-',
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-vacation-citizenship' },
    },
    {
      header: t('columnCompany'),
      accessorFn: (row) => row.user?.company ?? '-',
      cell: (info) => <span>{info.getValue() as string}</span>,
      meta: { className: 'column-company' },
    },
    {
      header: t('columnVacationPeriod'),
      accessorFn: (row) => row.vacationDates ?? [],
      cell: (info): JSX.Element => {
        const dates = info.getValue() as string[];
        return dates.length ? (
          <>
            {dates.map((date, idx) => (
              <span key={idx}>
                {date}
                {idx !== dates.length - 1 && <span style={{ color: '#A0A0A0', margin: '0 4px' }}>/</span>}
              </span>
            ))}
          </>
        ) : (
          <span>-</span>
        );
      },
      meta: { className: 'column-vacation-period' },
    },
    {
      header: t('columnAction'),
      // @ts-ignore
      cell: ({ row, hoveredRowId, currentRowId, selectedTable }): JSX.Element => {
        if (selectedTable === 'vacation-requests' && hoveredRowId === currentRowId) {
          return (
            <div className="employees-table-row-actions" style={{ display: 'flex', gap: '8px' }}>
              <button
                className="action-cancel-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEmployee(row.original, 'rejected');
                }}>
                {t('btnCancel')}
              </button>
              <button
                className="action-approve-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEmployee(row.original, 'approved');
                }}>
                {t('btnApprove')}
              </button>
            </div>
          );
        }

        if (selectedTable === 'on-vacation' && hoveredRowId === currentRowId) {
          return (
            <div className="employees-table-row-actions" style={{ display: 'flex', gap: '8px' }}>
              <button
                className="action-cancel-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveVacation((row.original as VacationRequestsResponse)?._id);
                }}>
                {t('btnCancel')}
              </button>
            </div>
          );
        }

        return (
          <div className="employees-table-action-cell">
            <button className="action-button" aria-label={t('columnAction')}>
              <img src={IconDots} alt="More" />
            </button>
          </div>
        );
      },
      meta: { className: 'column-action' },
    },
  ];

  type AnyCols = ColumnDef<TableData>[];

  const table = useReactTable<TableData>({
    data: isVacation ? (vacationRequests as unknown as TableData[]) : (employees as TableData[]),
    columns: (isVacation ? vacationRequestsColumns : employeesColumns) as AnyCols,
    getCoreRowModel: getCoreRowModel(),
    meta: { onSelectEmployee, onRemoveVacation, setSelectedEmployeeExpire, setIsExpireModalOpen },
  });

  if (isHandleLoading) return <Loader />;

  return (
    <div className="employees-table-wrapper">
      <table className="employees-table">
        <CurrentDocumentsPopup
          isExpireModalOpen={isExpireModalOpen}
          setIsExpireModalOpen={setIsExpireModalOpen}
          selectedEmployeeExpire={selectedEmployeeExpire}
        />
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
              onClick={() => {
                if (selectedTable !== 'on-vacation') {
                  onSelectEmployee(row.original);
                }
              }}>
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
    </div>
  );
};
