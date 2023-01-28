type SetSelectedEventAction = {
  type: 'selectedEvent/SET';
  payload: number | null;
};

const setSelectedEvent = (selectedEvent: number | null): SetSelectedEventAction => ({
  type: 'selectedEvent/SET',
  payload: selectedEvent,
});

export const actions = { setSelectedEvent };

const selectedEventReducer = (
  selectedEvent: number | null = null,
  action: SetSelectedEventAction,
): number | null => {
  switch (action.type) {
    case 'selectedEvent/SET':
      return action.payload;

    default:
      return selectedEvent;
  }
};

export default selectedEventReducer;
