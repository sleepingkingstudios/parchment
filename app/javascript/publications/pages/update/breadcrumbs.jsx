import React from 'react';

import Breadcrumbs from '../../../components/breadcrumbs/index';
import { hooks } from '../../store/updateFindPublication';

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
      url: (publication && publication.name) ? `/publications/${publication.id}` : null,
    },
    {
      label: 'Update',
      active: true,
    },
  ];
};

const { useEndpoint } = hooks;

const UpdatePublicationBreadcrumbs = () => {
  const breadcrumbs = useEndpoint(generateBreadcrumbs);

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );
};

UpdatePublicationBreadcrumbs.defaultProps = {};

UpdatePublicationBreadcrumbs.propTypes = {};

export default UpdatePublicationBreadcrumbs;
