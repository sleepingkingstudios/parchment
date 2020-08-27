import PropTypes from 'prop-types';

import ResponsiveActions from '../../../../components/responsive-actions';
import { injectProps } from '../../../../utils/react';

const SkillsTableActions = injectProps(
  ResponsiveActions,
  {
    actions: ['show'],
    baseUrl: '/reference/skills',
    resourceName: 'skill',
  },
);

SkillsTableActions.defaultProps = {
  onDelete: () => {},
};

SkillsTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default SkillsTableActions;
