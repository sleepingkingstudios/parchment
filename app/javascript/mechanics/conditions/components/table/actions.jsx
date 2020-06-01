import PropTypes from 'prop-types';

import ResponsiveActions from '../../../../components/responsive-actions';
import { injectProps } from '../../../../utils/react';

const ActionsTableActions = injectProps(
  ResponsiveActions,
  {
    baseUrl: '/mechanics/conditions',
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
