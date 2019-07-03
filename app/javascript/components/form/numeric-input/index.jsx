import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../input';
import { coerceInputValue } from '../utils';

const coerceToIntegerOrEmptyString = (value) => {
  const int = parseInt(value.toString(), 10);

  return Number.isNaN(int) ? '' : int;
};

const FormNumericInput = ({
  type,
  value,
  onChange,
  ...injectedProps
}) => {
  const props = {
    type,
    value: coerceToIntegerOrEmptyString(value).toString(),
    onChange: coerceInputValue(onChange, coerceToIntegerOrEmptyString),
    ...injectedProps,
  };

  return (
    <FormInput {...props} />
  );
};

FormNumericInput.defaultProps = {
  type: 'number',
};

FormNumericInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default FormNumericInput;
