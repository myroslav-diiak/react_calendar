import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentDateActions } from '../../features/currentDate';
import { actions as selectedEventActions } from '../../features/selectedEvent';
import './Footer.scss';

export const Footer: React.FC = () => {
  const dispatch = useAppDispatch();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = useAppSelector((state) => state.currentDate);

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  const [dateValue, setDateValue] = useState('');

  useEffect(() => {
    const newDate = new Date(currentYear, currentMonth, 1);
    dispatch(currentDateActions.setCurrentDate(newDate));
    setDateValue(`${currentYear}-${currentMonth < 9 ? '0' : ''}${currentMonth + 1}`);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const dateFilter = JSON.parse(localStorage.getItem('pickedDate') || '[]');

    if (dateFilter.length) {
      setCurrentYear(dateFilter[0]);
      setCurrentMonth(dateFilter[1]);
    }
  }, []);

  const saveSelectedData = (year: number, month: number) => {
    const data = [year, month];
    localStorage.setItem('pickedDate', JSON.stringify(data));
  };

  const datePickerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let value;
    if (inputValue.length) {
      value = inputValue.split('-');
    } else {
      value = [new Date().getFullYear(), new Date().getMonth() + 1];
    }

    setCurrentYear(+value[0]);
    setCurrentMonth(+value[1] - 1);

    saveSelectedData(+value[0], +value[1] - 1);
  };

  const rightArrowHandler = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      saveSelectedData(currentYear + 1, 0);
    } else {
      setCurrentMonth(currentMonth + 1);
      saveSelectedData(currentYear, currentMonth + 1);
    }
  };

  const leftArrowHandler = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      saveSelectedData(currentYear - 1, 11);
    } else {
      setCurrentMonth(currentMonth - 1);
      saveSelectedData(currentYear, currentMonth - 1);
    }
  };

  const addEventHandler = () => {
    dispatch(selectedEventActions.setSelectedEvent(0));
  };

  return (
    <div className="footer">
      <button
        type="button"
        className="btn btn-primary"
        onClick={addEventHandler}
      >
        +
      </button>

      <div className="date-container">
        <button
          type="button"
          className="btn btn-success"
          onClick={leftArrowHandler}
        >
          &#60;
        </button>
        <span className="month">
          {`${monthNames[currentMonth]} ${currentYear}`}
        </span>
        <button
          type="button"
          className="btn btn-success"
          onClick={rightArrowHandler}
        >
          &#62;
        </button>
      </div>

      <input
        type="month"
        value={dateValue}
        onChange={(event) => datePickerHandler(event)}
      />
    </div>
  );
};
