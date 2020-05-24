import React from 'react';
import PropTypes from 'prop-types';

const onClickHandler = ({ id, dismissAlert }) => (event) => {
  event.preventDefault();

  return dismissAlert(id);
};

const AlertDismissButton = ({ id, dismissAlert }) => (
  <button
    className="close"
    type="button"
    aria-label="Close"
    onClick={onClickHandler({ id, dismissAlert })}
  >
    <span aria-hidden="true">×</span>
  </button>
);

AlertDismissButton.defaultProps = {};

AlertDismissButton.propTypes = {
  id: PropTypes.string.isRequired,
  dismissAlert: PropTypes.func.isRequired,
};

export default AlertDismissButton;
