import { Event } from '../types/Event';

type SetEventsAction = {
  type: 'events/SET';
  payload: Event[];
};

const setEvents = (event: Event[]): SetEventsAction => ({
  type: 'events/SET',
  payload: event,
});

export const actions = { setEvents };

const eventsReducer = (
  events: Event[] = [],
  action: SetEventsAction,
): Event[] => {
  switch (action.type) {
    case 'events/SET':
      return action.payload;

    default:
      return events;
  }
};

export default eventsReducer;
