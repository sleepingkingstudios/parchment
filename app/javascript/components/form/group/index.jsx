import React from 'react';
import PropTypes from 'prop-types';

const widthClass = ({ colWidth }) => {
  if (colWidth) { return `col-sm-${colWidth}`; }

  return 'col';
};

const generateClassName = ({ className, colWidth }) => (
  `form-group ${widthClass({ colWidth })} ${className}`.trim()
);

const FormGroup = ({ children, className, colWidth }) => (
  <div className={generateClassName({ className, colWidth })}>
    { children }
  </div>
);

FormGroup.defaultProps = {
  className: '',
  colWidth: null,
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  colWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default FormGroup;
