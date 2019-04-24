import React from 'react';
import PropTypes from 'prop-types';

const FormTextAreaInput = ({
  id,
  prop,
  rows,
  value,
  onChange,
}) => (
  <textarea className="form-control" data-prop-name={prop} id={id} rows={rows} value={value} onChange={onChange} />
);

FormTextAreaInput.defaultProps = {
  rows: 3,
};

FormTextAreaInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  rows: PropTypes.number,
  value: PropTypes.string.isRequired,
};

export default FormTextAreaInput;
