import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import LinkButton from '../../../components/link-button';
import { hooks } from '../../store/deletePublication';

const { useDeleteData } = hooks;

const PublicationsTableActions = ({ id, onDelete }) => {
  const onSuccess = next => (props) => {
    next(props);

    onDelete(props);
  };
  const deletePublication = useDeleteData({
    onSuccess,
    wildcards: { id },
  });

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
        onClick={deletePublication}
        link
        buttonSize="sm"
        buttonStyle="danger"
      >
        Delete
      </Button>
    </div>
  );
};

PublicationsTableActions.defaultProps = {
  onDelete: () => {},
};

PublicationsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default PublicationsTableActions;
