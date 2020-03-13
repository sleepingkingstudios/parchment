import React from 'react';

import { MechanicForm } from '../../../components/form';
import { CreatePage } from '../../../../components/create-page';
import endpoint from '../../store/createActionForm';

const breadcrumbs = [
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
    label: 'Create',
    url: '/mechanics/actions/create',
    active: true,
  },
];

const CreateActionPage = () => (
  <CreatePage
    Form={MechanicForm}
    breadcrumbs={breadcrumbs}
    endpoint={endpoint}
    mapData={data => data}
    resourceName="Action"
  />
);

CreateActionPage.defaultProps = {};

CreateActionPage.propTypes = {};

export default CreateActionPage;
