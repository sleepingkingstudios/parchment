import React from 'react';
import PropTypes from 'prop-types';

const FormSelectOption = ({ label, value }) => (
  <option value={value}>
    { label }
  </option>
);

FormSelectOption.defaultProps = {};

FormSelectOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default FormSelectOption;
