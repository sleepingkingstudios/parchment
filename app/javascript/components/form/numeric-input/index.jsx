import React from 'react';
import PropTypes from 'prop-types';

import { coerceInputValue } from '../utils';

const coerceToIntegerOrEmptyString = (value) => {
  const int = parseInt(value.toString(), 10);

  return Number.isNaN(int) ? '' : int;
};

const FormNumericInput = ({
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
    value: coerceToIntegerOrEmptyString(value),
    onChange: coerceInputValue(onChange, coerceToIntegerOrEmptyString),
  };

  return (
    <input className="form-control" {...props} />
  );
};

FormNumericInput.defaultProps = {
  placeholder: '',
  type: 'number',
};

FormNumericInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default FormNumericInput;
