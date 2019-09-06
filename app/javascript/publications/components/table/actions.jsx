import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import LinkButton from '../../../components/link-button';
import { hooks } from '../../store/deletePublication';

const { useDeleteData } = hooks;

const PublicationsTableActions = ({ id }) => {
  const performRequest = useDeleteData({ wildcards: { id } });

  return (
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
      <Button
        onClick={performRequest}
        link
        buttonSize="sm"
        buttonStyle="danger"
      >
        Delete
      </Button>
    </div>
  );
};

PublicationsTableActions.defaultProps = {};

PublicationsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PublicationsTableActions;
