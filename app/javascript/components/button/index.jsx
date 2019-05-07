import React from 'react';
import PropTypes from 'prop-types';

const buttonStyleClass = ({ buttonStyle }) => {
  switch (buttonStyle) {
    case 'link':
      return 'btn-link';
    case 'primary':
    case 'secondary':
    case 'success':
    case 'danger':
    case 'warning':
    case 'info':
    case 'light':
    case 'dark':
      return `btn-outline-${buttonStyle}`;
    default:
      return 'btn-outline-primary';
  }
};

const buttonClass = ({ block, buttonStyle }) => {
  const classes = ['btn', buttonStyleClass({ buttonStyle })];

  if (block) { classes.push('btn-block'); }

  return classes.join(' ');
};

const disabledOnClick = ({ preventDefault }) => { preventDefault(); };

const Button = ({
  block,
  buttonStyle,
  children,
  disabled,
  onClick,
}) => (
  <button
    type="button"
    className={buttonClass({ block, buttonStyle })}
    disabled={disabled}
    onClick={disabled ? disabledOnClick : onClick}
  >
    { children }
  </button>
);

Button.defaultProps = {
  block: false,
  buttonStyle: 'primary',
  disabled: false,
};

Button.propTypes = {
  block: PropTypes.bool,
  buttonStyle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.string,
  ]).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;
