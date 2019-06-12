import PropTypes from 'prop-types';

/* eslint-disable-next-line import/prefer-default-export */
export const formType = PropTypes.shape({
  data: PropTypes.object.isRequired,
  namespace: PropTypes.string,
  onChangeAction: PropTypes.func,
  onSubmitAction: PropTypes.func,
});
