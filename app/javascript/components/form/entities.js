import PropTypes from 'prop-types';

export const formErrorsType = PropTypes.objectOf(
  PropTypes.arrayOf(PropTypes.string),
);

export const formPathType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
);

// TODO: Deprecate namespace.
export const formType = PropTypes.shape({
  data: PropTypes.object.isRequired,
  errors: formErrorsType,
  namespace: PropTypes.string,
  path: formPathType,
  onChangeAction: PropTypes.func,
  onSubmitAction: PropTypes.func,
});
