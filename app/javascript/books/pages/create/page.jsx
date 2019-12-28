import React from 'react';

import Page from '../../../components/page';
import CreateBookForm from './form';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Books',
    url: '/books',
  },
  {
    label: 'Create',
    url: '/books/create',
    active: true,
  },
];

const CreateBookPage = () => (
  <Page breadcrumbs={breadcrumbs} className="page-create-book">
    <h1>Create Book</h1>

    <CreateBookForm />
  </Page>
);

CreateBookPage.defaultProps = {};

CreateBookPage.propTypes = {};

export default CreateBookPage;
