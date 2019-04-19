import React from 'react';
import { Link } from 'react-router-dom';

import { breadcrumbType } from './entities';

const buildContents = ({ active, label, url }) => {
  if (active || !url) { return label; }

  return (
    <Link to={url}>
      { label }
    </Link>
  );
};

const Breadcrumb = ({ breadcrumb }) => {
  const props = { className: 'breadcrumb-item' };

  if (breadcrumb.active) {
    props.className += ' active';
    props['aria-current'] = 'page';
  }

  return (
    <li {...props}>
      { buildContents(breadcrumb) }
    </li>
  );
};

Breadcrumb.defaultProps = {};

Breadcrumb.propTypes = {
  breadcrumb: breadcrumbType.isRequired,
};

export default Breadcrumb;
