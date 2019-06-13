import PropTypes from 'prop-types';

const alertProps = {
  alertStyle: PropTypes.string,
  dismissible: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

const childrenAlertType = PropTypes.shape({
  ...alertProps,
  children: PropTypes.node.isRequired,
});

const messageAlertType = PropTypes.shape({
  ...alertProps,
  message: PropTypes.string.isRequired,
});

export const alertType = PropTypes.oneOfType([
  childrenAlertType,
  messageAlertType,
]);

export const alertListType = PropTypes.arrayOf(alertType);
