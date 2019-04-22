import React from 'react';
import PropTypes from 'prop-types';

import { titleize } from '../../../utils/string';

const buildLabel = ({ id, label, prop }) => {
  if (label === false) { return null; }

  const labelText = (!label || label.length === 0) ? titleize(prop) : label;

  return (
    <label className="form-check-label" htmlFor={id}>{ labelText }</label>
  );
};

const FormCheckboxInput = ({
  id,
  label,
  prop,
  value,
  onChange,
}) => {
  const props = {
    id,
    checked: value,
    onChange,
    'data-prop-name': prop,
  };

  return (
    <div className="form-check">
      <input type="checkbox" className="form-check-input" {...props} />
      { buildLabel({ id, label, prop }) }
    </div>
  );
};

FormCheckboxInput.defaultProps = {
  label: null,
};

FormCheckboxInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  prop: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

export default FormCheckboxInput;
