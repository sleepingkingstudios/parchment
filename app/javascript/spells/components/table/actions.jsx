import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import LinkButton from '../../../components/link-button';
import { hooks } from '../../store/deleteSpell';

const { useDeleteData } = hooks;

const SpellsTableActions = ({ id }) => {
  const performRequest = useDeleteData({ wildcards: { id } });

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

SpellsTableActions.defaultProps = {};

SpellsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SpellsTableActions;
