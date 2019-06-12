export const buttonStyleClass = ({ buttonStyle, outline }) => {
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
      return `btn-${outline ? 'outline-' : ''}${buttonStyle}`;
    default:
      return `btn-${outline ? 'outline-' : ''}primary`;
  }
};

export const buttonClass = ({
  block,
  buttonStyle,
  className,
  outline,
}) => {
  const classes = ['btn', buttonStyleClass({ buttonStyle, outline })];

  if (block) { classes.push('btn-block'); }

  if (className) { classes.push(className); }

  return classes.join(' ');
};

export const disabledOnClick = ({ preventDefault }) => { preventDefault(); };
