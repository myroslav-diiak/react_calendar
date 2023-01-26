import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './CalendarItem.scss';

type Props = {
  number: number | string;
};

export const CalendarItem: React.FC<Props> = ({ number }) => {
  const currentDate = useAppSelector(state => state.currentDate);

  return (
    <div className="calendar-item">
      {number}
    </div>
  );
};
