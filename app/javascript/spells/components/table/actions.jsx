import PropTypes from 'prop-types';

import ResponsiveActions from '../../../components/responsive-actions';
import deleteEndpoint from '../../store/deleteSpell';
import { injectProps } from '../../../utils/react';

const SpellsTableActions = injectProps(
  ResponsiveActions,
  {
    deleteEndpoint,
    resourceName: 'spell',
  },
);

SpellsTableActions.defaultProps = {
  onDelete: () => {},
};

SpellsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default SpellsTableActions;
