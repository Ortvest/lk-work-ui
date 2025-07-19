import React, { useState } from 'react';

import classNames from 'classnames';

import { AccommodationSlice } from '@global/store/slices/Accommodation.slice';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import IconDots from '@shared/assets/icons/IconDots.svg';

import './style.css';

import { AccommodationEntity } from '@shared/interfaces/Accommodation.interfaces';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export const accommodationsColumns: ColumnDef<any>[] = [
  {
    header: 'Name',
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
    header: 'Price',
    accessorFn: (row) => row.price,
    cell: (info) => <span>{`${info.getValue() as string} zl/month`}</span>,
    meta: { className: 'column-accommodation-price' },
  },
  {
    header: 'Action',
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
    cell: () => {
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
interface EmployeeTableContentProps {
  accommodations: AccommodationEntity[];
  // setIsDrawerOpen: (isOpen: boolean) => void;
}

const { setSelectedAccommodation } = AccommodationSlice.actions;

export const AccommodationTableContent = ({ accommodations }: EmployeeTableContentProps): React.ReactNode => {
  const dispatch = useTypedDispatch();
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  // const accommodations = useTypedSelector( state => state.accommodationReducer.accommodations);

  // const currentUserData = useTypedSelector((state) => state.userReducer.user);
  // const [handleVacationRequest, { isLoading: isHandleLoading }] = useHandleVacationRequestsMutation();

  const onSelectAccommodation = (entity: any): void => {
    dispatch(setSelectedAccommodation(entity));
  };

  type TableData = any;

  const table = useReactTable<TableData>({
    data: accommodations,
    columns: accommodationsColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onSelectAccommodation,
    },
  });

  // if (isHandleLoading) {
  //   return <Loader />;
  // }
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
            onClick={() => onSelectAccommodation(row.original)}>
            {row?.getVisibleCells()?.map((cell: any) => (
              <td
                key={cell.id}
                className={classNames(cell.column.columnDef.meta?.className, 'employees-table-content-header-cell')}>
                {flexRender(cell?.column?.columnDef?.cell, {
                  ...cell?.getContext(),
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
