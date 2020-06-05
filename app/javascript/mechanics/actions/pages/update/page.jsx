import React from 'react';
import PropTypes from 'prop-types';

import { MechanicForm } from '../../../components/form';
import { UpdatePage } from '../../../../components/update-page';
import findEndpoint, { hooks } from '../../store/updateFindAction';
import formEndpoint from '../../store/updateActionForm';
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
      label: 'Actions',
      url: '/mechanics/actions',
    },
    {
      label: ((resource && resource.name) || 'Loading...'),
      url: `/mechanics/actions/${id}`,
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

const UpdateActionPage = ({ match }) => {
  const id = getResourceId({ match });
  const { useEndpoint } = hooks;
  const { data } = useEndpoint();
  const breadcrumbs = generateBreadcrumbs({ id, resource: data.action });

  return (
    <UpdatePage
      Form={injectProps(MechanicForm, { baseUrl: '/mechanics/actions' })}
      breadcrumbs={breadcrumbs}
      findEndpoint={findEndpoint}
      formEndpoint={formEndpoint}
      mapData={obj => obj}
      mapResource={obj => obj.action}
      match={match}
      resourceName="Action"
    />
  );
};

UpdateActionPage.defaultProps = {};

UpdateActionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UpdateActionPage;
