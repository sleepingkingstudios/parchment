import React from 'react';
import PropTypes from 'prop-types';

const sizeClassName = ({ size, spinnerStyle }) => {
  switch (size) {
    case 'sm':
    case 'small':
      return `spinner-${spinnerStyle}-sm`;
    case 'lg':
    case 'large':
      return `spinner-${spinnerStyle}-lg`;
    default:
      return null;
  }
};

const generateClassName = ({ className, size, spinnerStyle }) => {
  const fragments = [`spinner-${spinnerStyle}`];
  const sizeClass = sizeClassName({ size, spinnerStyle });

  if (sizeClass) { fragments.push(sizeClass); }

  if (className) { fragments.push(className); }

  return fragments.join(' ');
};

const Spinner = ({
  className, size, spinnerStyle, style,
}) => (
  <span
    className={generateClassName({ className, size, spinnerStyle })}
    style={style}
    role="status"
    aria-hidden="true"
  />
);

Spinner.defaultProps = {
  className: '',
  size: 'md',
  spinnerStyle: 'border',
  style: {},
};

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  spinnerStyle: PropTypes.oneOf([
    'border',
    'grow',
  ]),
  /* eslint-disable-next-line react/forbid-prop-types */
  style: PropTypes.object,
};

export default Spinner;
