import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentEventActions } from '../../features/selectedEvent';
import { actions as eventsActions } from '../../features/events';
import { Event } from '../../types/Event';
import './EventsForm.scss';

export const EventsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedEventId = useAppSelector((state) => state.selectedEvent);
  const events = useAppSelector((state) => state.events);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const currentEvent = events.find((event) => event.id === selectedEventId);

  useEffect(() => {
    if (selectedEventId !== 0) {
      setTitle(currentEvent?.title || '');
      setDesc(currentEvent?.description || '');
      setTime(currentEvent?.time || '');
      setDate(currentEvent?.date || '');
    }
  }, []);

  const backButtonHandler = () => {
    dispatch(currentEventActions.setSelectedEvent(null));
  };

  const addNewEvent = () => {
    const [year, month, day] = date.split('-');

    const newEvent: Event = {
      id: +new Date(),
      title,
      description: desc,
      time,
      date,
      year: +year,
      month: +month - 1,
      day: +day,
      createdAt: new Date(),
    };

    localStorage.setItem('events', JSON.stringify([...events, newEvent]));
    dispatch(eventsActions.setEvents([...events, newEvent]));
    backButtonHandler();
  };

  const editEvent = () => {
    const [year, month, day] = date.split('-');

    const indexOfEvent = events.findIndex((event) => event.id === selectedEventId);

    events[indexOfEvent].title = title;
    events[indexOfEvent].description = desc;
    events[indexOfEvent].time = time;
    events[indexOfEvent].date = date;
    events[indexOfEvent].year = +year;
    events[indexOfEvent].month = +month - 1;
    events[indexOfEvent].day = +day;
    events[indexOfEvent].updatedAt = new Date();

    localStorage.setItem('events', JSON.stringify(events));
    dispatch(eventsActions.setEvents(events));
    backButtonHandler();
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedEventId === 0) {
      addNewEvent();
    } else {
      editEvent();
    }
  };

  const formatDate = (dateOf: Date) => {
    const convetredDate = new Date(dateOf);

    return `${convetredDate.toLocaleDateString()} ${convetredDate.toLocaleTimeString()}`;
  };

  const removeEvent = () => {
    const filteredEvents = events.filter((event) => event.id !== selectedEventId);
    localStorage.setItem('events', JSON.stringify(filteredEvents));
    dispatch(eventsActions.setEvents(filteredEvents));
    backButtonHandler();
  };

  return (
    <div className="events-form--container">
      <form
        className="events-form"
        onSubmit={(event) => handleFormSubmit(event)}
      >
        <h2 className="events-form--title">
          {selectedEventId === 0 ? 'Add' : 'Edit'}
          event
        </h2>
        {selectedEventId !== 0 && (
          <span className="events-form--label">
            {currentEvent?.updatedAt
              ? `Updated at: ${formatDate(currentEvent.updatedAt)}`
              : `Created at: ${formatDate(currentEvent?.createdAt || new Date())}`}
          </span>
        )}
        <label
          className="events-form--label"
          htmlFor="title-input"
        >
          Enter event title
        </label>
        <input
          type="text"
          className="events-form--text-field"
          placeholder="Title"
          id="title-input"
          value={title}
          minLength={3}
          maxLength={25}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label
          className="events-form--label"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="events-form--text-field textarea"
          placeholder="Description"
          id="description"
          value={desc}
          onChange={(event) => setDesc(event.target.value)}
        />

        <div className="events-form--datetime-container">
          <div className="events-form--date">
            <label
              className="events-form--label"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className="events-form--time">
            <label
              className="events-form--label"
              htmlFor="time"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
        </div>

        <div className="events-form--buttons-container">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={backButtonHandler}
          >
            X
          </button>

          {selectedEventId !== 0 && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={removeEvent}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </button>
          )}

          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};
