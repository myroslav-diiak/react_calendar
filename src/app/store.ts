import { applyMiddleware, combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import currentDateReducer from '../features/currentDate';
import eventsReducer from '../features/events';
import pickedDateReducer from '../features/pickedDate';
import selectedEventReducer from '../features/selectedEvent';

const rootReducer = combineReducers({
  currentDate: currentDateReducer,
  selectedEvent: selectedEventReducer,
  events: eventsReducer,
  pickedDate: pickedDateReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
