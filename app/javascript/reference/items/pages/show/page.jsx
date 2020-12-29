import React from 'react';
import PropTypes from 'prop-types';

import { ShowPage } from '../../../../components/show-page';
import { ItemBlock } from '../../components/block';
import endpoint, { hooks } from '../../store/showFindItem';
import deleteEndpoint, { hooks as deleteHooks } from '../../store/deleteItem';

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
      label: 'Reference',
      url: '/reference',
      active: true,
    },
    {
      label: 'Items',
      url: '/reference/items',
    },
    {
      label: ((resource && resource.name) || 'Loading...'),
      url: `/reference/items/${id}`,
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
      label: 'Update Item',
      outline: true,
      url: `/reference/items/${id}/update`,
    },
    {
      buttonStyle: 'danger',
      label: 'Delete Item',
      onClick: deleteData,
      outline: true,
    },
  ];
};
const getResourceId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const ShowItemPage = ({ match }) => {
  const id = getResourceId({ match });
  const { useEndpoint } = hooks;
  const { data } = useEndpoint();
  const resource = data.item;
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
      Block={ItemBlock}
      breadcrumbs={breadcrumbs}
      buttons={buttons}
      deleteEndpoint={deleteEndpoint}
      endpoint={endpoint}
      match={match}
      resourceName="Item"
    />
  );
};

ShowItemPage.defaultProps = {};

ShowItemPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowItemPage;
