import React from 'react';
import PropTypes from 'prop-types';

const renderHeading = (props) => {
  if (!props.subtitle) {
    return (
      <h1>{ props.title }</h1>
    );
  }

  return (
    <h1>
      { props.title }
      { ' ' }
      <small>{ props.subtitle }</small>
    </h1>
  )
}

const Header = (props) => {
  return (
    <header>
      { renderHeading(props) }
    </header>
  )
};

Header.defaultProps = {
  title: 'Page Title'
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default Header;
