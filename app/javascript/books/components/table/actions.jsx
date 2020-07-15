import PropTypes from 'prop-types';

import ResponsiveActions from '../../../components/responsive-actions';
import deleteEndpoint from '../../store/deleteBook';
import { injectProps } from '../../../utils/react';

const BooksTableActions = injectProps(
  ResponsiveActions,
  {
    deleteEndpoint,
    resourceName: 'book',
  },
);

BooksTableActions.defaultProps = {
  onDelete: () => {},
};

BooksTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default BooksTableActions;
