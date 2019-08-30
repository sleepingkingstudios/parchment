import React from 'react';

import Breadcrumbs from '../../../components/breadcrumbs/index';
import { hooks } from '../../store/showFindSpell';

const generateBreadcrumbs = ({ data }) => {
  const { spell } = data;

  return [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Spells',
      url: '/spells',
    },
    {
      label: ((spell && spell.name) || 'Loading...'),
      active: true,
    },
  ];
};
const { useEndpoint } = hooks;

const ShowSpellBreadcrumbs = () => {
  const breadcrumbs = useEndpoint(generateBreadcrumbs);

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );
};

ShowSpellBreadcrumbs.defaultProps = {};

ShowSpellBreadcrumbs.propTypes = {};

export default ShowSpellBreadcrumbs;
