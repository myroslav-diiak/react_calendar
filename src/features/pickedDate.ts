type SetPickedDateAction = {
  type: 'pickedDate/SET';
  payload: string | null;
};

const setPickedDate = (date: string | null): SetPickedDateAction => ({
  type: 'pickedDate/SET',
  payload: date,
});

export const actions = { setPickedDate };

const pickedDateReducer = (
  selectedEvent: string | null = null,
  action: SetPickedDateAction,
): string | null => {
  switch (action.type) {
    case 'pickedDate/SET':
      return action.payload;

    default:
      return selectedEvent;
  }
};

export default pickedDateReducer;
