import PropTypes from 'prop-types';

/* eslint-disable-next-line import/prefer-default-export */
export const loginFormType = PropTypes.shape(
  {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  },
);
