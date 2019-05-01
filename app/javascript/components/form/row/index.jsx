import React from 'react';
import PropTypes from 'prop-types';

const alignClass = (align) => {
  switch (align) {
    case 'center':
      return 'justify-content-center';
    case 'right':
      return 'justify-content-end';
    default:
      return 'justify-content-start';
  }
};

const verticalAlignClass = (verticalAlign) => {
  switch (verticalAlign) {
    case 'bottom':
      return 'align-items-bottom';
    case 'center':
      return 'align-items-center';
    case 'top':
    default:
      return 'align-items-top';
  }
};

const generateClassName = ({ align, className, verticalAlign }) => (
  `form-row ${alignClass(align)} ${verticalAlignClass(verticalAlign)} ${className}`.trim()
);

const FormRow = ({
  align,
  children,
  className,
  verticalAlign,
}) => (
  <div className={generateClassName({ align, className, verticalAlign })}>
    { children }
  </div>
);

FormRow.defaultProps = {
  align: 'left',
  className: '',
  verticalAlign: 'top',
};

FormRow.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  verticalAlign: PropTypes.string,
};

export default FormRow;
