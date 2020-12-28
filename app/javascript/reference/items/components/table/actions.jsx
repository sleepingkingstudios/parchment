import PropTypes from 'prop-types';

import ResponsiveActions from '../../../../components/responsive-actions';
import { injectProps } from '../../../../utils/react';

const ItemsTableActions = injectProps(
  ResponsiveActions,
  {
    actions: ['show', 'update'],
    baseUrl: '/reference/items',
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
