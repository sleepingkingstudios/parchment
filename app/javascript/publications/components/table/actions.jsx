import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../../../components/link-button';

const PublicationsTableActions = ({ id }) => (
  <div className="publication-actions">
    <LinkButton
      url={`/publications/${id}`}
      link
      buttonSize="sm"
      buttonStyle="info"
    >
      Show
    </LinkButton>
    <LinkButton
      url={`/publications/${id}/update`}
      link
      buttonSize="sm"
      buttonStyle="link"
    >
      Update
    </LinkButton>
  </div>
);

PublicationsTableActions.defaultProps = {};

PublicationsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PublicationsTableActions;
