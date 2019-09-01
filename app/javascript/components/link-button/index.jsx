import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { buttonClass } from '../button/utils';

const LinkButton = ({
  block,
  buttonSize,
  buttonStyle,
  children,
  className,
  link,
  outline,
  url,
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
    <Link to={url} className={generatedClassName}>
      { children }
    </Link>
  );
};

LinkButton.defaultProps = {
  block: false,
  buttonSize: null,
  buttonStyle: 'primary',
  className: null,
  link: false,
  outline: false,
};

LinkButton.propTypes = {
  block: PropTypes.bool,
  buttonSize: PropTypes.string,
  buttonStyle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  link: false,
  outline: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

export default LinkButton;
