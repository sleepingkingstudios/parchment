import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { kebabize } from 'utils/string';

const PageNavigationItem = ({ label, url }) => (
  <div className={`nav-item nav-item-${kebabize(label)}`}>
    <Link className="nav-link" to={url}>{ label }</Link>
  </div>
);

PageNavigationItem.defaultProps = {};

PageNavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PageNavigationItem;
