import PropTypes from 'prop-types';

export const loginFormType = PropTypes.shape(
  {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  },
);

export const userType = PropTypes.shape(
  {
    id: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    role: PropTypes.oneOf(
      [
        'admin',
        'user',
        'anonymous',
      ],
    ),
    username: PropTypes.string.isRequired,
  },
);

export const buildUser = () => ({
  id: '',
  emailAddress: '',
  role: 'anonymous',
  username: '',
});
