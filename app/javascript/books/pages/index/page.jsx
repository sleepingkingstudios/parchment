import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import Page from '../../../components/page';
import IndexBooksTable from './table';
import { hooks } from '../../store/indexFindBooks';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Books',
    url: '/books',
    active: true,
  },
];
const buttons = [
  {
    label: 'Create Book',
    outline: true,
    url: '/books/create',
  },
];
const { useRequestData } = hooks;

const BooksPage = () => {
  const requestData = useRequestData();

  requestData();

  return (
    <Page breadcrumbs={breadcrumbs} className="page-books">
      <HeadingWithButtons buttons={buttons}>Books</HeadingWithButtons>

      <IndexBooksTable />
    </Page>
  );
};

BooksPage.defaultProps = {};

BooksPage.propTypes = {};

export default BooksPage;
