import React from 'react';
import PropTypes from 'prop-types';

import { ShowPage } from '../../../../components/show-page';
import { MechanicBlock } from '../../../components/block';
import endpoint, { hooks } from '../../store/showFindCondition';
import deleteEndpoint, { hooks as deleteHooks } from '../../store/deleteCondition';

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
      active: true,
    },
  ]
);
const generateButtons = ({
  deleteData,
  id,
  resource,
}) => {
  if (!(resource && resource.id)) { return []; }

  return [
    {
      label: 'Update Condition',
      outline: true,
      url: `/mechanics/conditions/${id}/update`,
    },
    {
      buttonStyle: 'danger',
      label: 'Delete Condition',
      onClick: deleteData,
      outline: true,
    },
  ];
};
const getResourceId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const ShowConditionPage = ({ match }) => {
  const id = getResourceId({ match });
  const { useEndpoint } = hooks;
  const { data } = useEndpoint();
  const resource = data.condition;
  const breadcrumbs = generateBreadcrumbs({ id, resource });
  const { useDeleteData } = deleteHooks;
  const deleteData = useDeleteData({ wildcards: { id } });
  const buttons = generateButtons({
    deleteData,
    id,
    resource,
  });

  return (
    <ShowPage
      Block={MechanicBlock}
      breadcrumbs={breadcrumbs}
      buttons={buttons}
      deleteEndpoint={deleteEndpoint}
      endpoint={endpoint}
      match={match}
      resourceName="Condition"
    />
  );
};

ShowConditionPage.defaultProps = {};

ShowConditionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowConditionPage;
