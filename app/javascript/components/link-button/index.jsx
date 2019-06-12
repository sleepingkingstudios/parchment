import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { buttonClass } from '../button/utils';

const LinkButton = ({
  block,
  buttonStyle,
  children,
  className,
  outline,
  url,
}) => {
  const generatedClassName = buttonClass({
    block,
    buttonStyle,
    className,
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
  buttonStyle: 'primary',
  className: null,
  outline: false,
};

LinkButton.propTypes = {
  block: PropTypes.bool,
  buttonStyle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  outline: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

export default LinkButton;
