import React from 'react';

import Breadcrumbs from '../../../components/breadcrumbs/index';
import { hooks } from '../../store/updateFindBook';

const generateBreadcrumbs = ({ data }) => {
  const { book } = data;

  return [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Books',
      url: '/books',
    },
    {
      label: ((book && book.title) || 'Loading...'),
      url: (book && book.title) ? `/books/${book.id}` : null,
    },
    {
      label: 'Update',
      active: true,
    },
  ];
};

const { useEndpoint } = hooks;

const UpdateBookBreadcrumbs = () => {
  const breadcrumbs = useEndpoint(generateBreadcrumbs);

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );
};

UpdateBookBreadcrumbs.defaultProps = {};

UpdateBookBreadcrumbs.propTypes = {};

export default UpdateBookBreadcrumbs;
