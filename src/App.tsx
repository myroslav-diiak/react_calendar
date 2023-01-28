import React, { useEffect } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Calendar } from './components/Calendar';
import { EventsForm } from './components/EventsForm';
import { actions as eventsActions } from './features/events';
import { Event } from './types/Event';

function App() {
  const dispatch = useAppDispatch();
  const selectedEvent = useAppSelector((state) => state.selectedEvent);

  useEffect(() => {
    const events: Event[] = JSON.parse(localStorage.getItem('events') || '[]');
    dispatch(eventsActions.setEvents(events));
  }, []);

  return (
    <div className="App">
      <Calendar />
      {selectedEvent !== null && <EventsForm />}
    </div>
  );
}

export default App;
