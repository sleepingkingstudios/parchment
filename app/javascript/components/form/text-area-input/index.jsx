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

const FormTextAreaInput = ({
  className,
  id,
  rows,
  validStatus,
  value,
  onChange,
}) => {
  const props = {
    className: addClassName(
      'form-control',
      className,
      validClassName(validStatus),
    ),
    id,
    rows,
    value,
    onChange,
  };

  return (
    <textarea {...props} />
  );
};

FormTextAreaInput.defaultProps = {
  className: null,
  rows: 3,
  validStatus: null,
};

FormTextAreaInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  rows: PropTypes.number,
  validStatus: PropTypes.oneOf(['valid', 'invalid', null]),
  value: PropTypes.string.isRequired,
};

export default FormTextAreaInput;
