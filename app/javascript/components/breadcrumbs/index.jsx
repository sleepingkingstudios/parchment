import React from 'react';

import Breadcrumb from './breadcrumb';
import { breadcrumbsListType } from './entities';

const generateBreadcrumbs = breadcrumbs => (
  breadcrumbs.map((breadcrumb, index) => (
    /* eslint-disable-next-line react/no-array-index-key */
    <Breadcrumb key={`${breadcrumb}-${index}`} breadcrumb={breadcrumb} />
  ))
);

const Breadcrumbs = ({ breadcrumbs }) => {
  if (breadcrumbs.length === 0) { return null; }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        { generateBreadcrumbs(breadcrumbs) }
      </ol>
    </nav>
  );
};

Breadcrumbs.defaultProps = {
  breadcrumbs: [],
};

Breadcrumbs.propTypes = {
  breadcrumbs: breadcrumbsListType,
};

export default Breadcrumbs;
