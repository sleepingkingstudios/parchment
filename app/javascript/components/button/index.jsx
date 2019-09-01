import React from 'react';
import PropTypes from 'prop-types';

import { buttonClass, disabledOnClick } from './utils';

const Button = ({
  block,
  buttonSize,
  buttonStyle,
  children,
  className,
  disabled,
  link,
  onClick,
  outline,
}) => {
  const generatedClassName = buttonClass({
    block,
    buttonSize,
    buttonStyle,
    className,
    link,
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
  buttonSize: 'md',
  buttonStyle: 'primary',
  className: null,
  disabled: false,
  link: false,
  outline: false,
};

Button.propTypes = {
  block: PropTypes.bool,
  buttonSize: PropTypes.string,
  buttonStyle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  link: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  outline: PropTypes.bool,
};

export default Button;
