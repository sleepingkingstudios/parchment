import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const buildLabel = ({ id, label }) => {
  if (label === false) { return null; }

  return (
    <label className="custom-control-label" htmlFor={id}>{ label }</label>
  );
};

const FormCheckboxInput = ({
  id,
  label,
  value,
  onChange,
}) => {
  const props = {
    id,
    checked: value,
    onChange,
  };

  return (
    <div className="custom-control custom-checkbox">
      <input type="checkbox" className="custom-control-input" {...props} />
      { buildLabel({ id, label }) }
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
  value: PropTypes.bool.isRequired,
};

export default FormCheckboxInput;
