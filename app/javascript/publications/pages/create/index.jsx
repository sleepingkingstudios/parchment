import React from 'react';

import Page from '../../../components/page';
import CreatePublicationForm from './form';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Publications',
    url: '/publications',
  },
  {
    label: 'Create',
    url: '/publications/create',
    active: true,
  },
];

const CreatePublicationPage = () => (
  <Page breadcrumbs={breadcrumbs} className="page-create-publication">
    <h1>Create Publication</h1>

    <CreatePublicationForm />
  </Page>
);

CreatePublicationPage.defaultProps = {};

CreatePublicationPage.propTypes = {};

export default CreatePublicationPage;
