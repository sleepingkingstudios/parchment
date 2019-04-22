import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  id,
  placeholder,
  prop,
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
    'data-prop-name': prop,
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
  prop: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default FormInput;
