import initialState from './initialState';
import {
  ADD_ALERT,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
} from './actions';

const addAlert = (alerts, alert) => {
  const dup = alerts.slice(0);

  dup.push(alert);

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
