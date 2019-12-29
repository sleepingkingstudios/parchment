import React from 'react';

import Breadcrumbs from '../../../components/breadcrumbs/index';
import { hooks } from '../../store/showFindBook';

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
      active: true,
    },
  ];
};
const { useEndpoint } = hooks;

const ShowBookBreadcrumbs = () => {
  const breadcrumbs = useEndpoint(generateBreadcrumbs);

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );
};

ShowBookBreadcrumbs.defaultProps = {};

ShowBookBreadcrumbs.propTypes = {};

export default ShowBookBreadcrumbs;
