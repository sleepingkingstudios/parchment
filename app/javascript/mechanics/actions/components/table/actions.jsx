import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../../../../components/link-button';

const ActionsTableActions = ({ id }) => (
  <div className="mechanics-actions">
    <LinkButton
      url={`/mechanics/actions/${id}`}
      link
      buttonSize="sm"
      buttonStyle="info"
    >
      Show
    </LinkButton>
  </div>
);

ActionsTableActions.defaultProps = {};

ActionsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ActionsTableActions;
