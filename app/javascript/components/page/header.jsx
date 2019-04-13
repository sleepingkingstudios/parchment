import React from 'react';
import PropTypes from 'prop-types';

const renderHeading = ({ title, subtitle }) => {
  if (!subtitle) {
    return (
      <h1>{ title }</h1>
    );
  }

  return (
    <h1>
      { title }
      { ' ' }
      <small>{ subtitle }</small>
    </h1>
  );
};

const Header = (props) => {
  const { title, subtitle } = props;

  return (
    <header>
      { renderHeading({ title, subtitle }) }
    </header>
  );
};

Header.defaultProps = {
  subtitle: null,
};

Header.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Header;
