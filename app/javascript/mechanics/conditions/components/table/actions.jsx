import PropTypes from 'prop-types';

import ResponsiveActions from '../../../../components/responsive-actions';
import deleteEndpoint from '../../store/deleteCondition';
import { injectProps } from '../../../../utils/react';

const ActionsTableActions = injectProps(
  ResponsiveActions,
  {
    baseUrl: '/mechanics/conditions',
    deleteEndpoint,
    resourceName: 'condition',
  },
);

ActionsTableActions.defaultProps = {
  onDelete: () => {},
};

ActionsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default ActionsTableActions;
