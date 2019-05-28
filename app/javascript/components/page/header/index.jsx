import React from 'react';
import PropTypes from 'prop-types';

const renderHeading = ({ title, subtitle }) => {
  if (!subtitle) {
    return (
      <h1 className="display-4">{ title }</h1>
    );
  }

  return (
    <h1 className="display-4">
      { title }
      { ' ' }
      <small style={{ fontWeight: 300 }}>{ subtitle }</small>
    </h1>
  );
};

const PageHeader = (props) => {
  const { title, subtitle } = props;

  return (
    <header>
      { renderHeading({ title, subtitle }) }
      <hr />
    </header>
  );
};

PageHeader.defaultProps = {
  subtitle: null,
};

PageHeader.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default PageHeader;