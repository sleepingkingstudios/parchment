import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import Page from '../../../components/page';
import IndexPublicationsTable from './table';
import { hooks } from '../../store/indexFindPublications';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Publications',
    url: '/publications',
    active: true,
  },
];

const buttons = [];
const { useRequestData } = hooks;

const PublicationsPage = () => {
  const requestData = useRequestData();

  requestData();

  return (
    <Page breadcrumbs={breadcrumbs} className="page-publications">
      <HeadingWithButtons buttons={buttons}>Publications</HeadingWithButtons>

      <IndexPublicationsTable />
    </Page>
  );
};

PublicationsPage.defaultProps = {};

PublicationsPage.propTypes = {};

export default PublicationsPage;
