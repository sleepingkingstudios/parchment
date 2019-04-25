import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  id,
  placeholder,
  type,
  value,
  onChange,
}) => {
  const props = {
    id,
    placeholder,
    type,
    value,
    onChange,
  };

  return (
    <input className="form-control" {...props} />
  );
};

FormInput.defaultProps = {
  placeholder: '',
  type: 'text',
};

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default FormInput;
