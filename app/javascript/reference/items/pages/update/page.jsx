import React from 'react';
import PropTypes from 'prop-types';

import { ItemForm } from '../../components/form';
import { UpdatePage } from '../../../../components/update-page';
import findEndpoint, { hooks } from '../../store/updateFindItem';
import formEndpoint from '../../store/updateItemForm';
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

const UpdateItemPage = ({ match }) => {
  const id = getResourceId({ match });
  const { useEndpoint } = hooks;
  const { data } = useEndpoint();
  const breadcrumbs = generateBreadcrumbs({ id, resource: data.item });

  return (
    <UpdatePage
      Form={injectProps(ItemForm, { baseUrl: '/reference/items' })}
      breadcrumbs={breadcrumbs}
      findEndpoint={findEndpoint}
      formEndpoint={formEndpoint}
      mapData={obj => obj}
      mapResource={obj => obj.item}
      match={match}
      resourceName="Item"
    />
  );
};

UpdateItemPage.defaultProps = {};

UpdateItemPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UpdateItemPage;
