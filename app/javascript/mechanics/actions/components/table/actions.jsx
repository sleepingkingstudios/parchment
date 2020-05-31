import PropTypes from 'prop-types';

import ResponsiveActions from '../../../../components/responsive-actions';
import deleteEndpoint from '../../store/deleteAction';
import { injectProps } from '../../../../utils/react';

const ActionsTableActions = injectProps(
  ResponsiveActions,
  {
    baseUrl: '/mechanics/actions',
    deleteEndpoint,
    resourceName: 'action',
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
