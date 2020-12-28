import React from 'react';

import { ItemForm } from '../../components/form';
import { CreatePage } from '../../../../components/create-page';
import endpoint from '../../store/createItemForm';
import { injectProps } from '../../../../utils/react';

const breadcrumbs = [
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
    label: 'Create',
    url: '/reference/items/create',
    active: true,
  },
];

const CreateItemPage = () => (
  <CreatePage
    Form={injectProps(ItemForm, { baseUrl: '/reference/items' })}
    breadcrumbs={breadcrumbs}
    endpoint={endpoint}
    mapData={data => data}
    resourceName="Item"
  />
);

CreateItemPage.defaultProps = {};

CreateItemPage.propTypes = {};

export default CreateItemPage;
