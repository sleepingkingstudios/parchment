import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SpellsTableActions = ({ id }) => (
  <div className="spell-actions">
    <Link to={`/spells/${id}`} className="text-info">
      Show
    </Link>
    &nbsp;
    <Link to={`/spells/${id}/update`}>
      Update
    </Link>
  </div>
);

SpellsTableActions.defaultProps = {};

SpellsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SpellsTableActions;
