import React from 'react';
import PropTypes from 'prop-types';

import { addClassName } from '../../../utils/react';

const validClassName = (validStatus) => {
  switch (validStatus) {
    case 'valid':
      return 'is-valid';
    case 'invalid':
      return 'is-invalid';
    default:
      return null;
  }
};

const FormInput = ({
  className,
  id,
  placeholder,
  type,
  validStatus,
  value,
  onChange,
}) => {
  const generatedClassName = addClassName(
    'form-control',
    className,
    validClassName(validStatus),
  );
  const props = {
    className: generatedClassName,
    id,
    placeholder,
    type,
    value,
    onChange,
  };

  return (
    <input {...props} />
  );
};

FormInput.defaultProps = {
  className: null,
  placeholder: '',
  type: 'text',
  validStatus: null,
};

FormInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  validStatus: PropTypes.oneOf(['valid', 'invalid', null]),
  value: PropTypes.string.isRequired,
};

export default FormInput;
