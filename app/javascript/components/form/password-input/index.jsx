import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../input';

const FormPasswordInput = props => (
  <FormInput {...props} type="password" />
);

FormPasswordInput.defaultProps = {
  className: null,
  placeholder: '',
  validStatus: null,
};

FormPasswordInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validStatus: PropTypes.oneOf(['valid', 'invalid', null]),
  value: PropTypes.string.isRequired,
};

export default FormPasswordInput;
