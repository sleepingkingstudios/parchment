import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SpellsTableActions = ({ id }) => (
  <div className="spell-actions">
    <Link to={`/spells/${id}`}>
      Show
    </Link>
  </div>
);

SpellsTableActions.defaultProps = {};

SpellsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SpellsTableActions;
