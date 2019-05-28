import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../link-button';
import './styles.css';

const generateClassName = ({ className }) => {
  const classes = ['btn-sm float-right'];

  if (className) { classes.push(className); }

  return classes.join(' ');
};

const renderButton = ({
  className,
  label,
  url,
  ...props
}) => {
  const generatedClassName = generateClassName({ className });

  return (
    <LinkButton className={generatedClassName} url={url} {...props}>
      { label }
    </LinkButton>
  );
};

const HeadingWithButtons = ({ buttons, children }) => {
  const reversedButtons = [].concat(buttons).reverse();

  return (
    <div className="heading-with-buttons">
      <h1>{ children }</h1>

      {
        reversedButtons.map(
          ({ ...props }, index) => (
            renderButton({ ...props, key: `button-${index}` })
          ),
        )
      }
    </div>
  );
};

HeadingWithButtons.defaultProps = {};

HeadingWithButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node.isRequired,
};

export default HeadingWithButtons;
