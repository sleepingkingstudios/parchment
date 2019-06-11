import initialState from './initialState';
import {
  ADD_ALERT,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
} from './actions';
import {
  generateRandomUuid,
} from '../../../utils/uuid';

const alertAlreadyExists = (alerts, alert) => {
  let exists = false;

  alerts.forEach((existing) => {
    if (existing.id === alert.id) { exists = true; }

    return null;
  });

  return exists;
};

const addIdToAlert = (alert) => {
  if (alert.id) { return alert; }

  return Object.assign({}, alert, { id: generateRandomUuid() });
};

const addAlert = (alerts, alert) => {
  if (alertAlreadyExists(alerts, alert)) { return alerts; }

  const alertWithId = addIdToAlert(alert);
  const dup = alerts.slice(0);

  dup.push(alertWithId);

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
