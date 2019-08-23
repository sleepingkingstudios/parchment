import React from 'react';

import Breadcrumbs from '../../../components/breadcrumbs/index';
import { useSpell } from '../../show/store';

const generateBreadcrumbs = ({ spell }) => (
  [
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
  ]
);

const ShowSpellBreadcrumbs = () => {
  const breadcrumbs = useSpell(generateBreadcrumbs);

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );
};

ShowSpellBreadcrumbs.defaultProps = {};

ShowSpellBreadcrumbs.propTypes = {};

export default ShowSpellBreadcrumbs;
