import initialState from './initialState';
import {
  ADD_ALERT,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
} from './actions';
import { indexOfMatching } from '../../utils/array';
import { generateRandomUuid } from '../../utils/uuid';

const addIdToAlert = (alert) => {
  if (alert.id) { return alert; }

  return Object.assign({}, alert, { id: generateRandomUuid() });
};

const alertIndex = (alerts, id) => indexOfMatching(alerts, alert => (alert.id === id));

const addAlert = (alerts, alert) => {
  const alertWithId = addIdToAlert(alert);
  const dup = alerts.slice(0);
  const index = alertIndex(alerts, alertWithId.id);

  if (index >= 0) {
    dup.splice(index, 1, alertWithId);
  } else {
    dup.push(alertWithId);
  }

  return dup;
};

const dismissAlert = (alerts, id) => {
  const dup = [];

  alerts.forEach((alert) => {
    if (alert.id !== id) { dup.push(alert); }
  });

  return dup;
};

const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return Object.assign({}, state, {
        alerts: addAlert(state.alerts, action.payload.alert),
      });
    case DISMISS_ALERT:
      return Object.assign({}, state, {
        alerts: dismissAlert(state.alerts, action.payload.id),
      });
    case DISMISS_ALL_ALERTS:
      return Object.assign({}, state, { alerts: [] });
    default:
      return state;
  }
};

export default alertsReducer;
