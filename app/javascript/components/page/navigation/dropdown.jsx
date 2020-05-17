import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const renderItems = items => (
  Object.entries(items).map(([label, url]) => (
    <Link className="dropdown-item" to={url} key={label}>{label}</Link>
  ))
);

const PageNavigationDropdown = ({ items, label }) => (
  <div className="nav-item dropdown">
    <div
      className="nav-link dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      { label }
    </div>
    <div className="dropdown-menu">
      { renderItems(items) }
    </div>
  </div>
);

PageNavigationDropdown.defaultProps = {};

PageNavigationDropdown.propTypes = {
  items: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
  label: PropTypes.string.isRequired,
};

export default PageNavigationDropdown;
