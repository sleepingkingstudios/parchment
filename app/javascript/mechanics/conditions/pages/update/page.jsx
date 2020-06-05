import React from 'react';
import PropTypes from 'prop-types';

import { MechanicForm } from '../../../components/form';
import { UpdatePage } from '../../../../components/update-page';
import findEndpoint, { hooks } from '../../store/updateFindCondition';
import formEndpoint from '../../store/updateConditionForm';
import { injectProps } from '../../../../utils/react';

const generateBreadcrumbs = ({
  id,
  resource,
}) => (
  [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Mechanics',
      url: '/mechanics',
      active: true,
    },
    {
      label: 'Conditions',
      url: '/mechanics/conditions',
    },
    {
      label: ((resource && resource.name) || 'Loading...'),
      url: `/mechanics/conditions/${id}`,
    },
    {
      label: 'Update',
      active: true,
    },
  ]
);
const getResourceId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const UpdateConditionPage = ({ match }) => {
  const id = getResourceId({ match });
  const { useEndpoint } = hooks;
  const { data } = useEndpoint();
  const breadcrumbs = generateBreadcrumbs({ id, resource: data.condition });

  return (
    <UpdatePage
      Form={injectProps(MechanicForm, { baseUrl: '/mechanics/conditions' })}
      breadcrumbs={breadcrumbs}
      findEndpoint={findEndpoint}
      formEndpoint={formEndpoint}
      mapData={obj => obj}
      mapResource={obj => obj.condition}
      match={match}
      resourceName="Condition"
    />
  );
};

UpdateConditionPage.defaultProps = {};

UpdateConditionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UpdateConditionPage;
