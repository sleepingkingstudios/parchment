import React from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from '../../breadcrumbs';

const PageFooter = ({ breadcrumbs }) => (
  <footer>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
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
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
};

export default PageFooter;
