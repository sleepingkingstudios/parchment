import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const PageNavigationItem = ({ label, url }) => (
  <div className="nav-item">
    <Link className="nav-link" to={url}>{ label }</Link>
  </div>
);

PageNavigationItem.defaultProps = {};

PageNavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PageNavigationItem;
