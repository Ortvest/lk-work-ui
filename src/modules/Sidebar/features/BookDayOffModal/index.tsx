import { Fragment, useState } from 'react';

import classNames from 'classnames';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import ReactModal from 'react-modal';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import CalendarArrowLeftIcon from '@shared/assets/icons/CalendarArrowLeftIcon.svg';
import CalendarArrowRightIcon from '@shared/assets/icons/CalendarArrowRightIcon.svg';

import './style.css';

import { useSentVacationRequestMutation } from '@global/api/employee/employee.api';

interface BookDayOffModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

interface DateRange {
  from: Date;
  to: Date;
}

export const BookDayOffModal = ({ isModalOpen, setIsModalOpen }: BookDayOffModalProps): JSX.Element => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRanges, setSelectedRanges] = useState<DateRange[]>([]);
  const [tempRange, setTempRange] = useState<{ from?: Date; to?: Date }>({});

  const [sentVacationRequest] = useSentVacationRequestMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);

  const onModalCloseHandler = (): void => {
    setIsModalOpen(false);
  };

  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateAlreadySelected = (date: Date): boolean =>
    selectedRanges.some(({ from, to }) => isWithinInterval(date, { start: from, end: to }));

  const isSameRange = (a: DateRange, b: DateRange): boolean => isSameDay(a.from, b.from) && isSameDay(a.to, b.to);

  const handleDayClick = (day: Date): void => {
    if (isPastDate(day) || isDateAlreadySelected(day)) return;

    if (!tempRange.from) {
      setTempRange({ from: day });
    } else {
      const from = tempRange.from;
      const to = day > from ? day : from;
      const newRange = { from, to };

      const isDuplicate = selectedRanges.some((range) => isSameRange(range, newRange));
      if (!isDuplicate) {
        setSelectedRanges([...selectedRanges, newRange]);
      }

      setTempRange({});
    }
  };

  const isInSelectedRanges = (day: Date): boolean =>
    selectedRanges.some(({ from, to }) => isWithinInterval(day, { start: from, end: to }));

  const renderHeader = (): JSX.Element => (
    <div className="calendar-header">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        <img src={CalendarArrowLeftIcon} alt="calendar-arrow-left-icon" />
      </button>
      <span>{format(currentMonth, 'MMMM, yyyy')}</span>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        <img src={CalendarArrowRightIcon} alt="calendar-arrow-right-icon" />
      </button>
    </div>
  );

  const renderDays = (): JSX.Element => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    const days = [];
    let date = start;

    while (date <= end) {
      days.push(date);
      date = addDays(date, 1);
    }

    return (
      <div className="calendar-grid">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
        {days.map((day: Date, index: number) => {
          const disabled = isPastDate(day) || isDateAlreadySelected(day);
          const isSelected = isInSelectedRanges(day);
          const isTempStart = tempRange.from && isSameDay(day, tempRange.from);
          const isTempRange =
            tempRange.from && tempRange.to && isWithinInterval(day, { start: tempRange.from, end: tempRange.to! });

          const isRangeStart = selectedRanges.some(({ from }) => isSameDay(day, from));
          const isRangeEnd = selectedRanges.some(({ to }) => isSameDay(day, to));

          return (
            <div
              key={index}
              className={classNames('day-cell', {
                dim: !isSameMonth(day, currentMonth),
                selected: isSelected || isTempRange,
                'temp-start': isTempStart,
                disabled: disabled,
                'range-start': isRangeStart,
                'range-end': isRangeEnd,
              })}
              onClick={() => !disabled && handleDayClick(day)}>
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    );
  };

  const renderSelectedRanges = (): JSX.Element => (
    <div className="selected-ranges">
      {selectedRanges.map((range, index) => {
        const sameDay = isSameDay(range.from, range.to);
        return (
          <div key={index} className="tag">
            {sameDay ? format(range.from, 'd MMM') : `${format(range.from, 'd MMM')} – ${format(range.to, 'd MMM')}`}
            <button
              onClick={() => {
                setSelectedRanges(selectedRanges.filter((_, i) => i !== index));
              }}>
              ×
            </button>
          </div>
        );
      })}
    </div>
  );

  const onSentVacationRequestHanlder = async (): Promise<void> => {
    if (!employeeId || selectedRanges.length === 0) return;
    const formatDate = (date: Date): string => format(date, 'dd-MM-yyyy');
    const formatRanges = (ranges: { from: Date; to: Date }[]): string[] => {
      return ranges.map(({ from, to }) => {
        const formattedFrom = formatDate(from);
        const formattedTo = formatDate(to);

        return formattedFrom === formattedTo ? formattedFrom : `${formattedFrom}-${formattedTo}`;
      });
    };
    const formattedRanges = formatRanges(selectedRanges);
    await sentVacationRequest({ userId: employeeId, vacationDates: formattedRanges });
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <ReactModal
        ariaHideApp={false}
        overlayClassName="book-day-off-popup-overlay"
        className={classNames('book-day-off-popup-container')}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        isOpen={isModalOpen}>
        <header className={classNames('book-day-off-header')}>
          <h1 className={classNames('book-day-off-popup-title')}>Book a Day Off</h1>
        </header>

        <div className="calendar-container">
          {renderHeader()}
          {renderDays()}
          {renderSelectedRanges()}
        </div>

        <footer className={classNames('book-day-off-footer')}>
          <button className={classNames('book-day-off-cancel')} onClick={onModalCloseHandler}>
            Cancel
          </button>
          <button className={classNames('book-day-off-submit')} onClick={onSentVacationRequestHanlder}>
            Book
          </button>
        </footer>
      </ReactModal>
    </Fragment>
  );
};
