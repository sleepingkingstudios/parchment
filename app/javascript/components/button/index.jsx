import React from 'react';
import PropTypes from 'prop-types';

import { buttonClass, disabledOnClick } from './utils';

const Button = ({
  block,
  buttonStyle,
  children,
  className,
  disabled,
  onClick,
  outline,
}) => {
  const generatedClassName = buttonClass({
    block,
    buttonStyle,
    className,
    outline,
  });

  return (
    <button
      type="button"
      className={generatedClassName}
      disabled={disabled}
      onClick={disabled ? disabledOnClick : onClick}
    >
      { children }
    </button>
  );
};

Button.defaultProps = {
  block: false,
  buttonStyle: 'primary',
  className: null,
  disabled: false,
  outline: false,
};

Button.propTypes = {
  block: PropTypes.bool,
  buttonStyle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  outline: PropTypes.bool,
};

export default Button;
