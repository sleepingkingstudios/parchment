import React from 'react';
import PropTypes from 'prop-types';

import { addClassName } from '../../../utils/react';
import './styles.css';

const buildLabel = ({ id, label }) => {
  if (label === false) { return null; }

  return (
    <label className="custom-control-label" htmlFor={id}>{ label }</label>
  );
};

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

const validatedClassName = (validStatus) => {
  if (validStatus) { return 'custom-checkbox-validated'; }

  return null;
};

const FormCheckboxInput = ({
  className,
  id,
  label,
  validStatus,
  value,
  onChange,
}) => {
  const props = {
    className: addClassName(
      'custom-control-input',
      className,
      validClassName(validStatus),
    ),
    id,
    checked: value,
    onChange,
  };
  const wrapperClassName = addClassName(
    'custom-control',
    'custom-checkbox',
    validatedClassName(validStatus),
  );

  return (
    <div className={wrapperClassName}>
      <input type="checkbox" {...props} />
      { buildLabel({ id, label }) }
    </div>
  );
};

FormCheckboxInput.defaultProps = {
  className: null,
  label: null,
  validStatus: null,
};

FormCheckboxInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  validStatus: PropTypes.oneOf(['valid', 'invalid', null]),
  value: PropTypes.bool.isRequired,
};

export default FormCheckboxInput;
