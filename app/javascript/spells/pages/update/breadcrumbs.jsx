import React from 'react';

import Breadcrumbs from '../../../components/breadcrumbs/index';
import { hooks } from '../../store/updateFindSpell';

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
      url: (spell && spell.name) ? `/spells/${spell.id}` : null,
    },
    {
      label: 'Update',
      active: true,
    },
  ];
};

const { useEndpoint } = hooks;

const UpdateSpellBreadcrumbs = () => {
  const breadcrumbs = useEndpoint(generateBreadcrumbs);

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );
};

UpdateSpellBreadcrumbs.defaultProps = {};

UpdateSpellBreadcrumbs.propTypes = {};

export default UpdateSpellBreadcrumbs;
