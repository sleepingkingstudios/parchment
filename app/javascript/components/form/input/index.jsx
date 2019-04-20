import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  id,
  prop,
  type,
  value,
  onChange,
}) => {
  const props = {
    id,
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
  type: 'text',
};

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default FormInput;
