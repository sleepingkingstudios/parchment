import React from 'react';
import PropTypes from 'prop-types';

import { addClassName } from 'utils/react';
import PageNavigationDropdown from './dropdown';
import PageNavigationItem from './item';

const defaultClassName = 'navbar navbar-light navbar-expand-md bg-light page-header-navigation';

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

const PageNavigation = ({ className, items }) => (
  <nav className={addClassName(defaultClassName, className)}>
    <div className="navbar-nav">
      { renderItems(items) }
    </div>
  </nav>
);

PageNavigation.defaultProps = {
  className: null,
};

PageNavigation.propTypes = {
  className: PropTypes.string,
  items: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string),
    ]),
  ).isRequired,
};

export default PageNavigation;
