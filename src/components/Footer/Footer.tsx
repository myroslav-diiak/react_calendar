/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentDateActions } from '../../features/currentDate';
import './Footer.scss';

export const Footer: React.FC = () => {
  const dispatch = useAppDispatch();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = useAppSelector((state) => state.currentDate);

  const [currentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  const [date, setDate] = useState(`${currentYear}-${currentMonth < 10 ? 0 : ''}${1 + currentMonth}`);

  useEffect(() => {
    const year = +date.split('-')[0];
    const month = +date.split('-')[1] - 1;
    const newDate = new Date(year, month, 1);
    dispatch(currentDateActions.setCurrentDate(newDate));
  }, [date]);

  useEffect(() => {
    const newDate = new Date(currentYear, currentMonth, 1);
    dispatch(currentDateActions.setCurrentDate(newDate));
  }, [currentMonth, currentYear]);

  return (
    <div className="footer">
      <button type="button" className="btn btn-primary">+</button>

      <div className="date-container">
        <span 
          className="left-arrow arrow"
          onClick={() => setCurrentMonth(currentMonth + 1)}
        >
          &#60;
        </span>
        <span className="month">{monthNames[currentDate.getMonth()]}</span>
        <span className="right-arrow arrow">&#62;</span>
      </div>

      <input
          type="month"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
    </div>
  );
};
