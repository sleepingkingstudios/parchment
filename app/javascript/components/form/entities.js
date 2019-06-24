import PropTypes from 'prop-types';

export const formErrorsType = PropTypes.objectOf(
  PropTypes.arrayOf(PropTypes.string),
);

export const formType = PropTypes.shape({
  data: PropTypes.object.isRequired,
  errors: formErrorsType,
  namespace: PropTypes.string,
  onChangeAction: PropTypes.func,
  onSubmitAction: PropTypes.func,
});
