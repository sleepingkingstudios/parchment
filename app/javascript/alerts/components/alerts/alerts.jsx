import React from 'react';
import PropTypes from 'prop-types';

import Alert from '../../../components/alert';
import { alertListType } from '../../entities';

const Alerts = ({ alerts, dismissAlert }) => (
  alerts.map(alert => (<Alert key={alert.id} alert={alert} dismissAlert={dismissAlert} />))
);

Alerts.propTypes = {
  alerts: alertListType.isRequired,
  dismissAlert: PropTypes.func.isRequired,
};

export default Alerts;
