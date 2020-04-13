import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/button';
import LinkButton from '../../../../components/link-button';
import { hooks } from '../../store/deleteAction';

const { useDeleteData } = hooks;

const ActionsTableActions = ({ id, onDelete }) => {
  const onSuccess = next => (props) => {
    next(props);

    onDelete(props);
  };
  const deleteAction = useDeleteData({
    onSuccess,
    wildcards: { id },
  });

  return (
    <div className="mechanics-actions">
      <LinkButton
        url={`/mechanics/actions/${id}`}
        link
        buttonSize="sm"
        buttonStyle="info"
      >
        Show
      </LinkButton>
      <LinkButton
        url={`/mechanics/actions/${id}/update`}
        link
        buttonSize="sm"
        buttonStyle="link"
      >
        Update
      </LinkButton>
      <Button
        onClick={deleteAction}
        link
        buttonSize="sm"
        buttonStyle="danger"
      >
        Delete
      </Button>
    </div>
  );
};

ActionsTableActions.defaultProps = {
  onDelete: () => {},
};

ActionsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default ActionsTableActions;
