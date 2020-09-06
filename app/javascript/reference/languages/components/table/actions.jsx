import PropTypes from 'prop-types';

import ResponsiveActions from '../../../../components/responsive-actions';
import { injectProps } from '../../../../utils/react';

const LanguagesTableActions = injectProps(
  ResponsiveActions,
  {
    actions: ['show'],
    baseUrl: '/reference/languages',
    resourceName: 'language',
  },
);

LanguagesTableActions.defaultProps = {
  onDelete: () => {},
};

LanguagesTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default LanguagesTableActions;
