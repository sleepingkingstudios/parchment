import React from 'react';

import Alert from './alert';
import { alertListType } from './entities';

const Alerts = ({ alerts }) => (
  alerts.map(alert => (<Alert key={alert.id} alert={alert} />))
);

Alerts.propTypes = {
  alerts: alertListType.isRequired,
};

export default Alerts;
