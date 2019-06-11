const namespace = 'alerts';

export const ADD_ALERT = `${namespace}/addAlert`;
export const DISMISS_ALERT = `${namespace}/dismissAlert`;
export const DISMISS_ALL_ALERTS = `${namespace}/dismissAllAlerts`;

export const addAlert = alert => ({
  type: ADD_ALERT,
  payload: { alert },
});

export const dismissAlert = id => ({
  type: DISMISS_ALERT,
  payload: { id },
});

export const dismissAllAlerts = () => ({
  type: DISMISS_ALL_ALERTS,
});
