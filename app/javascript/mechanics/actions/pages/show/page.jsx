import React from 'react';
import PropTypes from 'prop-types';

import { ShowPage } from '../../../../components/show-page';

import { MechanicBlock } from '../../../components/block';
import endpoint, { hooks } from '../../store/showFindAction';

const deleteEndpoint = { hooks: { useDeleteData: () => {} } };

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
      url: `/mechanics/actions}/${id}`,
      active: true,
    },
  ]
);

const getResourceId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const ShowActionPage = ({ match }) => {
  const id = getResourceId({ match });
  const { useEndpoint } = hooks;
  const { data } = useEndpoint();
  const breadcrumbs = generateBreadcrumbs({ id, resource: data.action });

  return (
    <ShowPage
      Block={MechanicBlock}
      breadcrumbs={breadcrumbs}
      buttons={[]}
      deleteEndpoint={deleteEndpoint}
      endpoint={endpoint}
      match={match}
      resourceName="Action"
    />
  );
};

ShowActionPage.defaultProps = {};

ShowActionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowActionPage;
