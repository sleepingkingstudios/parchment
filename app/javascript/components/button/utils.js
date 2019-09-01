import { addClassName } from '../../utils/react';

const buttonSizeClass = ({ buttonSize }) => {
  switch (buttonSize) {
    case 'large':
    case 'lg':
      return 'btn-lg';
    case 'sm':
    case 'small':
      return 'btn-sm';
    default:
      return null;
  }
};

const buttonLinkStyleClass = ({ buttonStyle }) => {
  switch (buttonStyle) {
    case 'primary':
    case 'secondary':
    case 'success':
    case 'danger':
    case 'warning':
    case 'info':
    case 'light':
    case 'dark':
      return `btn-link text-${buttonStyle}`;
    default:
      return 'btn-link';
  }
};

const buttonStyleClass = ({ buttonStyle, link, outline }) => {
  if (link) { return buttonLinkStyleClass({ buttonStyle }); }

  switch (buttonStyle) {
    case 'primary':
    case 'secondary':
    case 'success':
    case 'danger':
    case 'warning':
    case 'info':
    case 'light':
    case 'dark':
      return `btn-${outline ? 'outline-' : ''}${buttonStyle}`;
    default:
      return `btn-${outline ? 'outline-' : ''}primary`;
  }
};

export const buttonClass = ({
  block,
  buttonSize,
  buttonStyle,
  className,
  link,
  outline,
}) => {
  const classes = ['btn', buttonStyleClass({ buttonStyle, link, outline })];

  if (block) { classes.push('btn-block'); }

  if (buttonSize) { classes.push(buttonSizeClass({ buttonSize })); }

  if (className) { classes.push(className); }

  return addClassName(...classes);
};

export const disabledOnClick = ({ preventDefault }) => { preventDefault(); };
