import React from 'react';

import { MechanicForm } from '../../../components/form';
import { CreatePage } from '../../../../components/create-page';
import endpoint from '../../store/createConditionForm';
import { injectProps } from '../../../../utils/react';

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
    label: 'Conditions',
    url: '/mechanics/conditions',
  },
  {
    label: 'Create',
    url: '/mechanics/conditions/create',
    active: true,
  },
];

const CreateConditionPage = () => (
  <CreatePage
    Form={injectProps(MechanicForm, { baseUrl: '/mechanics/conditions' })}
    breadcrumbs={breadcrumbs}
    endpoint={endpoint}
    mapData={data => data}
    resourceName="Condition"
  />
);

CreateConditionPage.defaultProps = {};

CreateConditionPage.propTypes = {};

export default CreateConditionPage;
