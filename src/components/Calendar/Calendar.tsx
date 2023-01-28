import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CalendarItem } from '../CalendarItem';
import { Footer } from '../Footer';
import { actions as currentDateActions } from '../../features/currentDate';
import './Calendar.scss';

export const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const currentDate = useAppSelector((state) => state.currentDate);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  let maxDays = monthDays[currentMonth];
  if (currentMonth === 1) {
    if ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) {
      maxDays += 1;
    }
  }

  const generateMatrix = () => {
    const matrix: number[][] | string[][] = [];
    matrix[0] = weekDays;
    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= firstDay) {
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  };

  const generateKey = (index: number) => `${index}${new Date().getTime()}`;

  useEffect(() => {
    const dateFilter = JSON.parse(localStorage.getItem('pickedDate') || '[]');
    if (dateFilter.length) {
      const newDate = new Date(dateFilter[0], dateFilter[1], 1);
      dispatch(currentDateActions.setCurrentDate(newDate));
    }
  }, []);

  return (
    <div className="calendar">
      {generateMatrix().map((row, i) => (
        <div className="calendar-row" key={generateKey(i)}>
          {row.map((item, k) => <CalendarItem key={generateKey(k)} data={item} />)}
        </div>
      ))}
      <Footer />
    </div>
  );
};
