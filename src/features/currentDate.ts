type SetCurrentDateAction = {
  type: 'currentDate/SET';
  payload: Date;
};

const setCurrentDate = (currentDate: Date): SetCurrentDateAction => ({
  type: 'currentDate/SET',
  payload: currentDate,
});

export const actions = { setCurrentDate };

const currentDateReducer = (currentDate: Date = new Date(), action: SetCurrentDateAction): Date => {
  switch (action.type) {
    case 'currentDate/SET':
      return action.payload;

    default:
      return currentDate;
  }
};

export default currentDateReducer;
