import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { capitalize } from '../../utils/string';

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
      <strong>{ capitalize(alertStyle) }:</strong>
      { ` ${message}` }
    </Fragment>
  );
};

const Alert = ({
  alertStyle,
  className,
  children,
  message,
}) => (
  <div className={alertClass({ alertStyle, className })}>
    { renderChildren({ alertStyle, children, message }) }
  </div>
);

Alert.defaultProps = {
  alertStyle: 'primary',
  className: null,
  children: null,
  message: '',
};

Alert.propTypes = {
  alertStyle: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  message: PropTypes.string,
};

export default Alert;
