import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import LinkButton from '../../../components/link-button';
import { hooks } from '../../store/deleteSpell';

const { useDeleteData } = hooks;

const SpellsTableActions = ({ id, onDelete }) => {
  const onSuccess = next => (props) => {
    next(props);

    onDelete(props);
  };
  const deleteSpell = useDeleteData({
    onSuccess,
    wildcards: { id },
  });

  return (
    <div className="spell-actions">
      <LinkButton
        url={`/spells/${id}`}
        link
        buttonSize="sm"
        buttonStyle="info"
      >
        Show
      </LinkButton>
      <LinkButton
        url={`/spells/${id}/update`}
        link
        buttonSize="sm"
        buttonStyle="link"
      >
        Update
      </LinkButton>
      <Button
        onClick={deleteSpell}
        link
        buttonSize="sm"
        buttonStyle="danger"
      >
        Delete
      </Button>
    </div>
  );
};

SpellsTableActions.defaultProps = {
  onDelete: () => {},
};

SpellsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default SpellsTableActions;
