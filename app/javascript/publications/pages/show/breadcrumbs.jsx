import React from 'react';

import Breadcrumbs from '../../../components/breadcrumbs/index';
import { hooks } from '../../store/showFindPublication';

const generateBreadcrumbs = ({ data }) => {
  const { publication } = data;

  return [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Publications',
      url: '/publications',
    },
    {
      label: ((publication && publication.name) || 'Loading...'),
      active: true,
    },
  ];
};
const { useEndpoint } = hooks;

const ShowPublicationBreadcrumbs = () => {
  const breadcrumbs = useEndpoint(generateBreadcrumbs);

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );
};

ShowPublicationBreadcrumbs.defaultProps = {};

ShowPublicationBreadcrumbs.propTypes = {};

export default ShowPublicationBreadcrumbs;
