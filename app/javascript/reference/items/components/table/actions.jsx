import PropTypes from 'prop-types';

import ResponsiveActions from '../../../../components/responsive-actions';
import deleteEndpoint from '../../store/deleteItem';
import { injectProps } from '../../../../utils/react';

const ItemsTableActions = injectProps(
  ResponsiveActions,
  {
    baseUrl: '/reference/items',
    deleteEndpoint,
    resourceName: 'item',
  },
);

ItemsTableActions.defaultProps = {
  onDelete: () => {},
};

ItemsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default ItemsTableActions;
