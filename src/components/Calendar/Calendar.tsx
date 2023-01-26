import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { CalendarItem } from '../CalendarItem';
import './Calendar.scss';

export const Calendar: React.FC = () => {
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const currentDate = useAppSelector(state => state.currentDate);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  console.log(firstDay);

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

  useEffect(() => {
    console.log(generateMatrix());
  }, []);

  return (
    <div className="calendar">
      {generateMatrix().map(row => {
        return (
          <div className="calendar-row">
            {row.map(item => <CalendarItem number={item} />)}
          </div>
        );
      })}
    </div>
  );
};
