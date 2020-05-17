import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AlertDismissButton from './dismissButton';
import { alertType } from '../../alerts/entities';
import { capitalize } from '../../utils/string';

const alertBadge = ({ alertStyle }) => {
  switch (alertStyle) {
    case 'danger':
    case 'info':
    case 'success':
    case 'warning':
      return capitalize(alertStyle);
    default:
      return 'Notice';
  }
};

const alertStyleClass = ({ alertStyle }) => {
  switch (alertStyle) {
    case 'primary':
    case 'secondary':
    case 'success':
    case 'danger':
    case 'warning':
    case 'info':
    case 'light':
    case 'dark':
      return `alert-${alertStyle}`;
    default:
      return 'alert-primary';
  }
};

export const alertClass = ({ alertStyle, className }) => {
  const classes = ['alert', alertStyleClass({ alertStyle })];

  if (className) { classes.push(className); }

  return classes.join(' ');
};

const renderChildren = ({ alertStyle, children, message }) => {
  if (children) { return children; }

  return (
    <Fragment>
      <strong>{ alertBadge({ alertStyle }) }:</strong>
      { ` ${message}` }
    </Fragment>
  );
};

const renderDismissButton = ({ alert, dismissAlert }) => {
  if (!alert.dismissible) { return null; }

  return (
    <AlertDismissButton id={alert.id} dismissAlert={dismissAlert} />
  );
};

const Alert = ({ alert, className, dismissAlert }) => {
  const { alertStyle, children, message } = alert;

  return (
    <div className={alertClass({ alertStyle, className })}>
      { renderChildren({ alertStyle, children, message }) }

      { renderDismissButton({ alert, dismissAlert }) }
    </div>
  );
};

Alert.defaultProps = {
  className: null,
};

Alert.propTypes = {
  alert: alertType.isRequired,
  className: PropTypes.string,
  dismissAlert: PropTypes.func.isRequired,
};

export default Alert;
