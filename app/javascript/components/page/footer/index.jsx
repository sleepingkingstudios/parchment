import React from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from '../../breadcrumbs';

const renderBreadcrumbs = (breadcrumbs) => {
  if (React.isValidElement(breadcrumbs)) { return breadcrumbs; }

  return (<Breadcrumbs breadcrumbs={breadcrumbs} />);
};

const PageFooter = ({ breadcrumbs }) => (
  <footer>
    { renderBreadcrumbs(breadcrumbs) }
    <hr />
    <p style={{ textAlign: 'center' }}>
      <small className="text-muted">
        What lies beyond the furthest reaches of the sky?
      </small>
    </p>
  </footer>
);

PageFooter.defaultProps = {
  breadcrumbs: [],
};

PageFooter.propTypes = {
  breadcrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.node,
  ]),
};

export default PageFooter;
