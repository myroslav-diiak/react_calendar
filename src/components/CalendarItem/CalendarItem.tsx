import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Event } from '../../types/Event';
import './CalendarItem.scss';
import { EventsList } from '../EventsList';

type Props = {
  data: number | string;
};

export const CalendarItem: React.FC<Props> = ({ data }) => {
  const events: Event[] = useAppSelector((state) => state.events);
  const currentDate = useAppSelector((state) => state.currentDate);

  const nowDate = new Date();

  const nowDay = nowDate.getDate();
  const nowMonth = nowDate.getMonth();
  const nowYear = nowDate.getFullYear();

  const selectedMonth = currentDate.getMonth();
  const selectedYear = currentDate.getFullYear();

  const isToday = nowDay === data && nowMonth === selectedMonth && nowYear === selectedYear;

  const todayEvents = events.filter((event) => {
    const { day, month, year } = event;

    return day === data && month === selectedMonth && year === selectedYear;
  });

  if (data < 1) {
    return (
      <div className="calendar-item empty" />
    );
  }

  return (
    <div className={cn(
      'calendar-item',
      { day: typeof data === 'number' },
      { 'week-day': typeof data === 'string' },
      { today: isToday },
    )}
    >
      {data}
      { !!todayEvents.length && <EventsList events={todayEvents} />}
    </div>
  );
};
