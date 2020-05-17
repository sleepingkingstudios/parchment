import React from 'react';
import PropTypes from 'prop-types';

import PageNavigationDropdown from './dropdown';
import PageNavigationItem from './item';

const renderItems = items => (
  Object.entries(items).map(([label, value]) => {
    if (typeof value === 'string') {
      return (
        <PageNavigationItem label={label} url={value} key={label} />
      );
    }

    return (
      <PageNavigationDropdown label={label} items={value} key={label} />
    );
  })
);

const PageNavigation = ({ items }) => (
  <nav className="navbar navbar-light navbar-expand-md bg-light page-header-navigation">
    <div className="navbar-nav">
      { renderItems(items) }
    </div>
  </nav>
);

PageNavigation.defaultProps = {};

PageNavigation.propTypes = {
  items: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string),
    ]),
  ).isRequired,
};

export default PageNavigation;
