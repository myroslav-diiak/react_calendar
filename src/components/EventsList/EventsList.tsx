import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Event } from '../../types/Event';
import { actions as currentEventActions } from '../../features/selectedEvent';
import './EventsList.scss';

type Props = {
  events: Event[];
};

export const EventsList: React.FC<Props> = ({ events }) => {
  const dispatch = useAppDispatch();

  const sortedEvents = events.sort((a, b) => a.time.localeCompare(b.time));

  const eventClickHandler = (id: number) => {
    dispatch(currentEventActions.setSelectedEvent(id));
  };

  return (
    <ul className="event-list">
      {sortedEvents.map((event) => (
        <li
          key={event.id}
          className="event-list--item"
          onClick={() => eventClickHandler(event.id)}
        >
          {event.title}
        </li>
      ))}
    </ul>
  );
};
